from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import joblib

# Load data
df = pd.read_csv('./dataset/full_dataset.csv',nrows=1000000)

# Drop the unnecessary columns
df = df.drop(['id_student', 'code_presentation'], axis=1)
df = df.dropna()

df.final_result = df.final_result.map({'Withdrawn': 0, 'Fail': 0, 'Pass': 1, 'Distinction': 1})

le = LabelEncoder()
cat_cols = [
    "highest_education",
    "age_band",
    "disability",
    "final_result",
    "imd_band",
    "code_module",
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

joblib.dump(model, "model.pkl") 

model_columns = list(x.columns)

joblib.dump(model_columns, 'model_columns.pkl')
