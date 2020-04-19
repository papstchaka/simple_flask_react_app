import os
import datetime
from flask import Flask, json, request
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import safe_str_cmp
from flask_cors import CORS

project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "note.db"))

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'super-secret'

# setting up the database
app.config["SQLALCHEMY_DATABASE_URI"] = database_file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    deadlineDate = db.Column(db.DateTime, nullable=False)
    registrationDate = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return "<ID: {}>".format(self.name)



def get_notes():
    notes = Note.query.all()
    notelist = []
    for note in notes:
        notelist.append({
            "pk": note.id,
            "name": note.name,
            "deadlineDate": note.deadlineDate,
            "registrationDate": note.registrationDate
        })
    return notelist

def add_note(name, deadlineDate):
    note = Note(
        name = name,
        deadlineDate = datetime.datetime.strptime(deadlineDate,'%Y-%m-%d'),
        registrationDate = datetime.datetime.now()
    )
    db.session.add(note)
    db.session.commit()

def get_note(id_):
    note = Note.query.filter_by(id = id_).order_by(Note.id.desc()).first()
    if note != None:
        return note.id
    else:
        raise ValueError

def change_note(id_, name, deadlineDate):
    note = Note.query.filter_by(id = id_).order_by(Note.id.desc()).first()
    note.name = name
    if "," not in deadlineDate:
        note.deadlineDate = datetime.datetime.strptime(deadlineDate,'%Y-%m-%d')
    db.session.commit()

def delete_note(id_):
    note = Note.query.filter_by(id = id_).order_by(Note.id.desc()).first()
    db.session.delete(note)
    db.session.commit()

@app.route('/api/simple_app/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def home():
    # try:
        if request.method == "GET":
            notes = get_notes()
            return app.response_class(response=json.dumps(notes), status=200, mimetype='application/json')
        
        elif request.method == "POST":
            name, deadlineDate = request.json["name"], request.json["deadlineDate"]
            add_note(name, deadlineDate)
            return app.response_class(status=201)
        
        # else:
        #     try:
        #         note = get_note(request.json["pk"])
        #     except:
        #         return app.response_class(status=404)
        #     if request.method == "PUT":
        #         change_note(note, request.json["name"], request.json["deadlineDate"])
        #         return app.response_class(status=204)
            
        #     elif request.method == "DELETE":
        #         delete_note(note)
        #         return app.response_class(status=204)
    # except:
    #     return app.response_class(status=400)

@app.route('/api/simple_app/<u>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def home2(u):
    # try:
        try:
            note = get_note(u)
        except:
            return app.response_class(status=404)
        if request.method == "PUT":
            change_note(note, request.json["name"], request.json["deadlineDate"])
            return app.response_class(status=204)
        
        elif request.method == "DELETE":
            delete_note(note)
            return app.response_class(status=204)
    # except:
    #     return app.response_class(status=400)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=2222)

'''
## init all dbs
from app import db
db.create_all()
'''