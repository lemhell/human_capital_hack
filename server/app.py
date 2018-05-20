from flask import Flask, jsonify, request
from flask_cors import CORS
from teams_data import teams_initial
from hacks_data import hacks_initial
from users_data import users_initial

app = Flask(__name__)
CORS(app)

teams = teams_initial.copy()
hacks = hacks_initial.copy()


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/stats/teams')
def stats_teams():
    with_y = []
    for item in teams:
        with_y.append({'label': item['name'], 'y': item['score']})
    return jsonify(with_y)


@app.route('/stats/hacks')
def stats_hacks():
    with_y = []
    for item in hacks:
        with_y.append({'label': item['name'], 'y': item['score']})
    return jsonify(with_y)


pair = (0, 1)
users = users_initial.copy()


@app.route('/stats/users')
def stats_users():
    with_y = []
    for item in users:
        with_y.append({'label': item['name'], 'y': item['test-score']})

    with_y_java = []
    for item in users:
        with_y_java.append({'label': item['name'], 'y': item['java']})

    with_y_python = []
    for item in users:
        with_y_python.append({'label': item['name'], 'y': item['python']})

    with_y_score = []
    for item in users:
        with_y_score.append({'label': item['name'], 'y': item['score']})
    return jsonify([with_y, with_y_java, with_y_python, with_y_score])


@app.route('/vote')
def vote():
    (fst_index, snd_index) = pair
    first = users[fst_index]
    second = users[snd_index]
    return jsonify([first, second])


@app.route('/vote_set', methods=['POST'])
def vote_set():
    global users
    data = request.get_json(force=True)
    print("DATA", data)
    users[data]['score'] = users[data]['score'] + 0.3
    update_pair()
    return jsonify(data)


def update_pair():
    global pair
    fst = (pair[0] + 1) % 5
    snd = (pair[1] + 1) % 5
    pair = (fst, snd)
