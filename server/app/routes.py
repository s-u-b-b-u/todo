from flask import Blueprint, jsonify, request

from app import db

from app.models import Todo



# The blueprint name must match the import in your __init__.py

routes = Blueprint('routes', __name__)



# --- TEST ROUTE ---

@routes.route('/', methods=['GET'])

def index():

    return jsonify({"message": "API is running successfully!"})



# --- READ ALL (GET) ---

@routes.route('/todos', methods=['GET'])

def get_todos():

    try:

        # Query all todos from the database

        todos = Todo.query.order_by(Todo.created_at.desc()).all()
        print([todo.to_dict() for todo in todos])

        # Convert list of objects to list of dictionaries

        return jsonify([todo.to_dict() for todo in todos]), 200

    except Exception as e:

        return jsonify({"error": str(e)}), 500



# --- CREATE (POST) ---

@routes.route('/todos', methods=['POST'])

def create_todo():

    try:

        data = request.get_json()

        

        # specific validation

        if not data or not data.get('title'):

            return jsonify({"error": "Title is required"}), 400



        new_todo = Todo(

            title=data['title'],

            description=data.get('description', '')

        )



        db.session.add(new_todo)

        db.session.commit()



        return jsonify(new_todo.to_dict()), 201

    except Exception as e:

        db.session.rollback()

        return jsonify({"error": str(e)}), 500



# --- UPDATE (PUT) ---

@routes.route('/todos/<int:id>', methods=['PUT'])

def update_todo(id):

    try:

        todo = Todo.query.get_or_404(id)

        data = request.get_json()



        if 'title' in data:

            todo.title = data['title']

        if 'description' in data:

            todo.description = data['description']

        if 'is_complete' in data:

            todo.is_complete = data['is_complete']



        db.session.commit()

        return jsonify(todo.to_dict()), 200

    except Exception as e:

        db.session.rollback()

        return jsonify({"error": str(e)}), 500



# --- DELETE (DELETE) ---

@routes.route('/todos/<int:id>', methods=['DELETE'])

def delete_todo(id):

    try:

        todo = Todo.query.get_or_404(id)

        db.session.delete(todo)

        db.session.commit()

        return jsonify({"message": "Todo deleted successfully"}), 200

    except Exception as e:

        db.session.rollback()

        return jsonify({"error": str(e)}), 500