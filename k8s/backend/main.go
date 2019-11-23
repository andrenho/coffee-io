package main

import (
	"encoding/json"
  "fmt"
  "log"
  "os"
  "net/http"
  "database/sql"
  _ "github.com/go-sql-driver/mysql"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
}

//
// types
//

type Ingredient struct {
  Name       string   `json:"name"`
  Percentage float64  `json:"percentage"`
  Type       string   `json:"type"`
  Color      string   `json:"color"`
  Cost       float64  `json:"cost"`
  Qtd        int      `json:"qtd"`
  LightColor bool     `json:"lightColor"`
}

type Recipe struct {
  RecipeName   string        `json:"recipeName"`
  Description  string        `json:"description"`
  Size         string        `json:"size"`
  Ingredients  []Ingredient  `json:"ingredients"`
  TotalCost    float64       `json:"totalCost"`
}

type DeliveryAddress struct {
  Name          string      `json:"name"`
  Email         string      `json:"email"`
  Address       string      `json:"address"`
  City          string      `json:"city"`
  State         string      `json:"state"`
  Zip           string      `json:"zip"`
}

type OrderItem struct {
  Name          string       `json:"name"`
  Description   string       `json:"description"`
  Size          string       `json:"size"`
  TotalCost     float64      `json:"totalCost"`
  Ingredients   []Ingredient `json:"ingredients"`
}

type Order struct {
  DeliveryAddress DeliveryAddress `json:"deliveryAddress"`
  DeliveryCost    float64         `json:"deliveryCost"`
  TaxCost         float64         `json:"taxCost"`
  Total           float64         `json:"total"`
  Items           []OrderItem     `json:"items"`
}

// 
// health
//

func health(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintln(w, "ok");
}

func openDatabase() (*sql.DB, error) {
  return sql.Open("mysql", "coffee:" + os.Getenv("DB_PASSWORD") + "@tcp(" + os.Getenv("DB_HOST") + ":3306)/db")
}

// 
// recipes
//

func recipeHandler(w http.ResponseWriter, r *http.Request) {
  if r.Method != http.MethodGet {
    http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
  }

  recipes := []Recipe {
    {
      "Espresso",
      "A creamy, strong coffee prepared under ideal conditions.",
      "small",
      []Ingredient { { "Espresso", 1.0, "coffee", "#000000", 4.0, 4, false } },
      4.0,
    }, {
      "Café con leche",
      "The perfect way to start your morning.",
      "medium",
      []Ingredient {
        { "Brewed (strong)", 0.5, "coffee", "#610B0B", 3.0, 2, false },
        { "Milk", 0.5, "liquid", "#FAFAFA", 2.0, 2, false },
      },
      5.0,
    },
  }

  js, err := json.Marshal(recipes)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  enableCors(&w)
  w.Header().Set("Content-Type", "application/json")
  w.Write(js)
}

// 
// ingredients
//

func ingredientHandler(w http.ResponseWriter, r *http.Request) {
  if r.Method != http.MethodGet {
    http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
  }

  db, err := openDatabase()
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }
  defer db.Close()

  results, err := db.Query("select name, percentage, type, color, cost, qtd, lightcolor from ingredients")
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  var ingredients []Ingredient
  for results.Next() {
    var ing Ingredient
    var tp string
    err = results.Scan(&ing.Name, &ing.Percentage, &tp, &ing.Color, &ing.Cost, &ing.Qtd, &ing.LightColor)
    if err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      return
    }
    switch s := tp; s {
    case "L":
      ing.Type = "Liquids"
    case "C":
      ing.Type = "Coffee"
    case "D":
      ing.Type = "Dairy"
    }
    ingredients = append(ingredients, ing)
  }

  js, err := json.Marshal(ingredients)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  enableCors(&w)
  w.Header().Set("Content-Type", "application/json")
  w.Write(js)
}

// 
// orders
//

func insertOrderInDatabase(db *sql.DB, order Order) error {
  tx, err := db.Begin()
  if err != nil {
    return err
  }
  defer tx.Rollback()

  // orders
  stmt, err := tx.Prepare(`INSERT INTO orders (name, email, address, city, state, zip, delivery_cost, tax_cost, total )
                                VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
  if err != nil {
    return err
  }
  d := order.DeliveryAddress
  result, err := stmt.Exec(d.Name, d.Email, d.Address, d.City, d.State, d.Zip, order.DeliveryCost, order.TaxCost, order.Total)
  if err != nil {
    return err
  }
  id, err := result.LastInsertId()
  if err != nil {
    return err
  }
  stmt.Close()

  // items
  stmt, err = tx.Prepare(`INSERT INTO order_items (order_id, num, name, description, size, total_cost)
                                VALUES ( ?, ?, ?, ?, ?, ? )`)
  if err != nil {
    return err
  }
  for i, item := range order.Items {
    size := "X"
    switch item.Size {
    case "small": size = "S"
    case "medium": size = "M"
    case "large": size = "L"
    }
    _, err = stmt.Exec(id, i+1, item.Name, item.Description, size, item.TotalCost)
    if err != nil {
      return err
    }

    // ingredients
    stmt_i, err := tx.Prepare(`INSERT INTO item_ingredients (order_id, item_num, ingredient_id)
                                    VALUES (?, ?, (SELECT id FROM ingredients WHERE name = ?))`)
    if err != nil {
      return err
    }
    for _, ing := range item.Ingredients {
      _, err = stmt_i.Exec(id, i+1, ing.Name)
      if err != nil {
        return err
      }
    }
    stmt_i.Close()
  }
  stmt.Close()

  err = tx.Commit()
  if err != nil {
    return err
  }

  return nil
}

func orderHandler(w http.ResponseWriter, r *http.Request) {
  enableCors(&w)
  if r.Method == http.MethodOptions {
    return
  }
  if r.Method != http.MethodPost {
    http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
  }

  decoder := json.NewDecoder(r.Body)
  var order Order
  err:= decoder.Decode(&order)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  db, err := openDatabase()
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }
  defer db.Close()

  err = insertOrderInDatabase(db, order)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  fmt.Fprintln(w, "ok")
}

// 
// main
//

func main() {
  http.HandleFunc("/healthz", health)
  http.HandleFunc("/ingredients/", ingredientHandler)
  http.HandleFunc("/recipes/global/", recipeHandler)
  http.HandleFunc("/cart", orderHandler)
  log.Fatal(http.ListenAndServe(":8888", nil))
}
