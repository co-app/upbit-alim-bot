updatecoin:
	curl -X POST http://localhost:3000/dev/coin/updateFavoriteCoinList -d '{"favor_coin_list":"[123,123]"}' -H "authorization:U2FsdGVkX18s35+nZHDcZFW6F3YCcYiTII3KsKfr38niF79AhNZ0mAlpXwJoj2+MWwWEeNRHU9ta1w1ndDtWK7ZGvkBKl27Mu4LALKnLXio="

updatecoin-not-auth:
	curl -X POST http://localhost:3000/dev/coin/updateFavoriteCoinList -d '{"key":"123"}'

udpatecoin-invalid:	
	curl -X POST http://localhost:3000/dev/coin/updateFavoriteCoinList -d '{"key":"123"}' -H "authorization:U2FsdGVkX18s35+nZHDcZFW6F3YCcYiTII3KsKfr38niF79AhNZ0mAlpXwJoj2+MWwWEe27Mu4LALKnLXio="
