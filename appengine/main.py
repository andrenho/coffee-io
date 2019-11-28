from connexion.resolver import RestyResolver
import connexion
# from flask import Flask, render_template

#app = Flask(__name__)

#@app.route('/')
#def root():
#    return render_template('index.html', hello='Olá mundo!')

if __name__ == '__main__':
    app = connexion.App(__name__, port=9090, specification_dir='swagger/')
    app.add_api('coffee.yaml', resolver=RestyResolver('api'))
    app.run()
