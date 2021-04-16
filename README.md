# Introdução


O projeto foi desenvolvido em cima do template mdbreact-admin para não precisar criar os componentes do zero e focar nas funcionalidades.

## Build Setup

``` bash
npm install
npm start
```

> As chamadas de backend estão apontando para a URL http://127.0.0.1:3333.
Caso deseje trocar, basta acessar src/services/api.js.

```
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3333"
});

export default api;
```