package main

import (
	"encoding/json"
  "log"
  "net/http"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
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
      []Ingredient { { "Espresso", 1.0, "coffee", "#000000", 4.0, 4 } },
      4.0,
    }, {
      "Café con leche",
      "The perfect way to start your morning.",
      "medium",
      []Ingredient {
        { "Brewed (strong)", 0.5, "coffee", "#610B0B", 3.0, 2 },
        { "Mild", 0.5, "liquid", "#FAFAFA", 2.0, 2 },
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
  http.HandleFunc("/recipes/global/", recipeHandler)
  log.Fatal(http.ListenAndServe(":8888", nil))
}
