from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, ConfusionMatrixDisplay
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import LabelEncoder
import joblib

# Load data
df = pd.read_csv('E:/NAM HUNG/CAPSTONE PROJECT/firstTry.csv',nrows=500000)

# Drop the unnecessary columns
df = df.drop(['imd_band', 'code_module', 'code_presentation', 'age_band', 'disability', 'num_of_prev_attempts', 'id_student.1', 'id_student'], axis=1)
df = df.dropna()

df.final_result = df.final_result.map({'Withdrawn': 0, 'Fail': 0, 'Pass': 1, 'Distinction': 1})

le = LabelEncoder()
cat_cols = [
    "highest_education",
    #"age_band",
    #"disability",
    "final_result",
    #"imd_band",
    #"code_module",
    #"code_presentation",
    "region"
]

for label in cat_cols:
    df[label] = le.fit_transform(df[label])
x = df.drop('final_result', axis=1)
y = df['final_result']

# Split the data into training and testing sets
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=1)

# Initialize the model
model = RandomForestClassifier(n_estimators=150, random_state=1)

# Fit the model
model.fit(x_train, y_train)

# Predict
y_pred = model.predict(x_test)
probabilities = model.predict_proba(x_test)
importances = model.feature_importances_

print(f'Accuracy: {accuracy_score(y_test, y_pred)}')
print(f'Precision: {precision_score(y_test, y_pred)}')
print(f'Recall: {recall_score(y_test, y_pred)}')
print(f'F1: {f1_score(y_test, y_pred)}')
print(probabilities)
print(importances)

df1 = pd.read_csv('E:/NAM HUNG/CAPSTONE PROJECT/ATopDoc.csv',nrows=500000)
id_site_max_values = df1.head(20)['id_site'].tolist()
print(id_site_max_values)

joblib.dump(model, "model.pkl") 

model_columns = list(x.columns)

joblib.dump(model_columns, 'model_columns.pkl')

joblib.dump(id_site_max_values, 'id_site_max_values.pkl')
