package main

import (
  "log"
  "os"
  "database/sql"
  _ "github.com/go-sql-driver/mysql"
)

func openDatabase() (*sql.DB, error) {
  return sql.Open("mysql", "coffee:" + os.Getenv("DB_PASSWORD") + "@tcp(" + os.Getenv("DB_HOST") + ":3306)/db?parseTime=true")
}


// 
// orders
//

func cleanDatabase() error {
  db, err := openDatabase()
  if err != nil {
    return err
  }
  defer db.Close()

  stmt, err := db.Query("DELETE FROM item_ingredients")
  if err != nil {
    return err
  }
  stmt.Close()

  stmt, err = db.Query("DELETE FROM order_items")
  if err != nil {
    return err
  }
  stmt.Close()

  stmt, err = db.Query("DELETE FROM orders")
  if err != nil {
    return err
  }
  stmt.Close()

  return nil
}

// 
// main
//

func main() {
  log.Println("Cleaning database...")
  err := cleanDatabase()
  if err != nil {
    panic(err)
  }
  log.Println("Database clear.")
}
