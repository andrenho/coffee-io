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
  db, err := sql.Open("mysql", "coffee:" + os.Getenv("DB_PASSWORD") + "@tcp(" + os.Getenv("DB_HOST") + ":3306)/db")
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
    ingredients = append(ingredients, ing)
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
