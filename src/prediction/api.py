from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

@app.route('/passing_rate_prediction', methods=['POST'])
def passing_rate_prediction():
    if model_lms:
        json_ = request.json
        query = pd.get_dummies(pd.DataFrame([json_]))
        query = query.reindex(columns=model_columns, fill_value=0)
        prediction = (model_lms.predict(query)).tolist()[0]

        prediction_proba = model_lms.predict_proba(query).tolist()[0]
        
        importance_matrix = model_lms.feature_importances_.tolist()

        importance_output = {}

        for idx, field in enumerate(prediction_field):
            importance_output[field] = round(importance_matrix[idx] * 100)

        return jsonify({
            'prediction': prediction,
            'probability': {
                'failed': round(prediction_proba[0] * 100),
                'passed': round(prediction_proba[1] * 100),
            }, 
            'importance': importance_output})


if __name__ == '__main__':
    model_lms = joblib.load("model.pkl")

    model_columns = joblib.load("model_columns.pkl")

    prediction_field = [
        "Code module",
        "Date registration",
        "Region",
        "Highest education",
        "Age band",
        "Disability",
        "Imd band",
        "Num of previous attempts",
        "In progress score"
    ]
    
    app.run(debug=True)
    