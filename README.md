## Typescript-Serverless

### Architecture

```
    zip -> s3 -> api gateway(http) -> lambda
```

### Insatll

```
   npm i serverless aws-lambda @types/serverless @types/aws-lambda serverless-plugin-typescript -D
```

### Rule

```
    eslintrc.js
    > 'import/prefer-default-export': 'off',
```

### Reference

<a href="https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml"> Serverless</a>
