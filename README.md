# Multi-wallet ETH Tx Sender

Send raw tx data with customizable gas settings for any number of wallets

## Setup

**First**, create a .env file and populate it with:\
REACT_APP_MAINNET_API_KEY = "Alchemy API Key"\
REACT_APP_MAINNET_API_URL = "RPC Server URL"\
REACT_APP_BURNERS = [wallet #1, wallet #2, ...]\
REACT_APP_KEYS = [private key #1, private key #2, ...]\
REACT_APP_TO_ADDRESS = "your address"\
\
**Fields:**\
To - Contract Address to interact with\
Value - ETH Value to send along with transaction\
Base - Base Fee in GWEI\
Prio - Priority Fee in GWEI\
Limit - Max units of gas you're willing to use for the transaction\
Tx - Raw transaction data\
\
**Buttons:**\
Transfer - For ERC-721 contracts, send all tokens from all wallets to "REACT_APP_TO_ADDRESS"\
Send - Send transaction for all selected wallets (left column)\
Send All - Send transaction for every listed wallet\


## Scripts


In the project directory, you can run:

### `npm i`
### `npm start`

Open [http://localhost:3000](http://localhost:3000)
