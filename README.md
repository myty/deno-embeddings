# Embeddings in Deno (Demo)

This is a simple Deno CLI app that demonstrates how to use embeddings in a Deno CLI app.

## Running the sample docs

To run this app, you need to have following:

- Deno: <https://deno.land/#installation>
- Ollama: <https://ollama.com/>

Once you have Deno installed, you can run the app by executing the following commands:

```sh
ollama pull mxbai-embed-large
```

```sh
ollama pull llama3.1
```

```sh
deno task dev embed ./sample-docs
```

```sh
deno task dev prompt "What animals are llamas related to?"
```
