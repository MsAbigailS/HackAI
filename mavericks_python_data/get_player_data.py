import boto3
import io
import pandas as pd
import secrets

# Set Buffer
buffer_pbp = io.BytesIO()
buffer_players = io.BytesIO()

# Create connection to S3
s3 = boto3.resource(
    "s3",
    aws_access_key_id=secrets.AWS_ACCESS_KEY,
    aws_secret_access_key=secrets.AWS_SECRET_KEY,
)

# Read PBP Data from S3
pbp_object = s3.Object("utd-hackathon", "event_pbp.parquet")
pbp_object.download_fileobj(buffer_pbp)

df_pbp = pd.read_parquet(buffer_pbp)

print(df_pbp.head())

df_pbp.to_csv("pbp.csv")

# Read Players Data from S3
players_object = s3.Object("utd-hackathon", "game_players.parquet")
players_object.download_fileobj(buffer_players)

df_players = pd.read_parquet(buffer_players)

# pyarrow
# fastparquet
