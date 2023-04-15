# Setting up the environment for getting mavericks data
Run `python -m virtualenv ./.venv` to create a virtual environment and make sure that VSCode is using it.
(to make sure that vscode is using it do ctrl+shift+p and type in "python: select interpreter" and select the one in the .venv folder)

# Grabbing the data
Next run the `pip install -r ./mavericks_python_data/requirements.txt` command to install all the required packages.

Put the downloaded `secrets.py` file in the `mavericks_python_data` folder.

Finally run the `get_player_data.py` file to get the data.