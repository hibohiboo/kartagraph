```mermaid
graph LR
    fa:fa-check-->fa:fa-coffee
```

```mermaid

stateDiagram-v2
    [*] --> ログイン
    ログイン --> [*]

    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]

```