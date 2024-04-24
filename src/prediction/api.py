import json
from flask import Flask, request, jsonify
import pandas as pd
import joblib
import requests


app = Flask(__name__)

@app.route('/passing_rate_prediction', methods=['POST'])
def passing_rate_prediction():
    if model_lms:
        # Replace the docList by docCount
        json_ = request.json
        docList = json_["docList"]
        del json_["docList"]
        json_["docCount"] = len(docList)
        del json_["id_student"]
        print(json_)        
        # Replace the docList by docCount
        query = pd.get_dummies(pd.DataFrame([json_]))
        query = query.reindex(columns=model_columns, fill_value=0)
        prediction = (model_lms.predict(query)).tolist()[0]

        prediction_proba = model_lms.predict_proba(query).tolist()[0]
        
        importance_matrix = model_lms.feature_importances_.tolist()

        newList=[]
        for i in id_site_max_values:
            if(i not in docList):
                newList.append(i)
        
        importance_output = {}

        for idx, field in enumerate(prediction_field):
            importance_output[field] = round(importance_matrix[idx] * 100)

        return jsonify({
            'prediction': prediction,
            'probability': {
                'failed': round(prediction_proba[0] * 100),
                'passed': round(prediction_proba[1] * 100),
            }, 
            'importance': importance_output,
            'id_site_max_values':newList})


if __name__ == '__main__':
    model_lms = joblib.load("model.pkl")

    model_columns = joblib.load("model_columns.pkl")
    
    id_site_max_values = joblib.load("id_site_max_values.pkl")

    prediction_field = [
        #"id_student",
        "docCount",
        "date_registration",
        "region",
        "highest_education",
        "inprogress_score"
    ]
    
    response = requests.get('http://example.com')
    
    app.run(debug=True)
    