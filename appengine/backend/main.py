from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

my_recipes = [
    {
        'userScope': 'global',
        'recipeName':  'Espresso',
        'description': 'A creamy, strong coffee prepared under ideal conditions.',
        'size':  'small',
        'ingredients': [
            { 'name': 'Espresso', 'percentage': 1.0, 'type':'coffee', 'color':'#000000', 'cost':4.0, 'qtd': 4 },
        ],
        'totalCost': 4.0,
    },
    {
        'userScope': 'global',
        'recipeName': 'Café con leche',
        'description': 'The perfect way to start your morning.',
        'size': 'medium',
        'ingredients': [
            { 'name': 'Brewed (strong)', 'percentage': 0.5, 'type':'coffee', 'color':'#610B0B', 'cost':3.0, 'qtd': 2 },
            { 'name': 'Milk', 'percentage': 0.5, 'type':'liquid', 'color':'#FAFAFA', 'cost':2.0, 'qtd': 2 },
        ],
        'totalCost': 5.0,
    }
]

my_ingredients = [
    { 'name':'Espresso',        'type':'Coffee',     'color':'#000000', 'cost':4.0 },
    { 'name':'Brewed (strong)', 'type':'Coffee',     'color':'#610B0B', 'cost':3.0 },
    { 'name':'Brewed (weak)',   'type':'Coffee',     'color':'#8A4B08', 'cost':3.0 },
    { 'name':'Cream',           'type':'Dairy',      'color':'#F5F6CE', 'cost':4.0, 'lightColor': True },
    { 'name':'Milk',            'type':'Dairy',      'color':'#FAFAFA', 'cost':2.0, 'lightColor': True },
    { 'name':'Whipped milk',    'type':'Dairy',      'color':'#F2F2F2', 'cost':3.5, 'lightColor': True },
    { 'name':'Water',           'type':'Liquids',    'color':'#20A0FF', 'cost':0.0, 'lightColor': True },
    { 'name':'Chocolate',       'type':'Liquids',    'color':'#8A4B08', 'cost':5.0 },
    { 'name':'Whisky',          'type':'Liquids',    'color':'#FFBF00', 'cost':12.0, 'lightColor': True },
]

@app.route('/')
def root():
    return jsonify('hello')

@app.route('/recipes/global/')
def recipes():
    return jsonify(my_recipes)

@app.route('/ingredients/')
def ingredients():
    return jsonify(my_ingredients)

if __name__ == '__main__':
    app.run()

# vim:st=4:sts=4:sw=4:expandtab
