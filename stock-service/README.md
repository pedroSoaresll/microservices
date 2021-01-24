# How to deploy

The command below will run deploy with prod stage

```sh
$ yarn deploy
```

> NOTE: The serverless can't automatically trigger the dynamo stream with a lambda so, comment all events that use dynamodb stream, do the deploy and after, uncomment and run deploy again. Remember to get the ARN of dynamodb stream generated if is the fist deploy.
