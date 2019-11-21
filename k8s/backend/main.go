package main

import (
	"encoding/json"
  "fmt"
  "log"
  "net/http"
  "database/sql"
  _ "github.com/go-sql-driver/mysql"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

// 
// health
//

func health(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintln(w, "ok");
}

// 
// ingredients
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

func ingredientHandler(w http.ResponseWriter, r *http.Request) {
  db, err := sql.Open("mysql", "username:password@tcp(127.0.0.1:3306)/test")
  if err != nil {
    panic(err.Error())
  }
  defer db.Close()

  ingredients := []Ingredient {
      { "Espresso",        0.0, "Coffee", "#000000", 4.0, 0, false },
      { "Brewed (strong)", 0.0, "Coffee", "#610B0B", 3.0, 0, false },
      { "Brewed (weak)",   0.0, "Coffee", "#8A4B08", 3.0, 0, false },
      { "Cream",           0.0, "Dairy",  "#F5F6CE", 4.0, 0, true },
      { "Milk",            0.0, "Dairy",  "#FAFAFA", 2.0, 0, true },
      { "Whipped milk",    0.0, "Dairy",  "#F2F2F2", 3.5, 0, true },
      { "Water",           0.0, "Liquids","#20A0FF", 0.0, 0, true },
      { "Chocolate",       0.0, "Liquids","#8A4B08", 5.0, 0, false },
      { "Whisky",          0.0, "Liquids","#FFBF00", 12.0, 0, true },
  }

  js, err := json.Marshal(ingredients)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  enableCors(&w);
  w.Header().Set("Content-Type", "application/json")
  w.Write(js)
}

// 
// recipes
//

func recipeHandler(w http.ResponseWriter, r *http.Request) {
  type Recipe struct {
    RecipeName   string        `json:"recipeName"`
    Description  string        `json:"description"`
    Size         string        `json:"size"`
    Ingredients  []Ingredient  `json:"ingredients"`
    TotalCost    float64       `json:"totalCost"`
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
        { "Mild", 0.5, "liquid", "#FAFAFA", 2.0, 2, false },
      },
      5.0,
    },
  }

  js, err := json.Marshal(recipes)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  enableCors(&w);
  w.Header().Set("Content-Type", "application/json")
  w.Write(js)
}

// 
// main
//

func main() {
  http.HandleFunc("/healthz", health)
  http.HandleFunc("/ingredients/", ingredientHandler)
  http.HandleFunc("/recipes/global/", recipeHandler)
  log.Fatal(http.ListenAndServe(":8888", nil))
}
