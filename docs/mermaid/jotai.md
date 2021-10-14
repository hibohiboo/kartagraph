## 状態遷移図


### ログイン ― 初期入力

```mermaid
flowchart TD
    匿名ログイン --> B[キャラクターがいるか]
    B -->|いる| C[ゲーム画面]
    B -->|いない| D[初期説明画面]
    D-->E[キャラクター名入力]
    E-->F[初期パーティ自動作成&登録]
    F-->C
```

## シナリオの状態

```mermaid
flowchart TD
    A[シナリオ未選択] -->|シナリオ開始| B[シナリオA]
    B -->|シナリオ終了| A[シナリオ取得]
    B -->|ゲームオーバー| A
    B -->|シナリオ開始| C[シナリオB]
    C -->|シナリオ終了| B
    
```






---

## 参考

[mermaid](https://mermaid-js.github.io/mermaid/#/stateDiagram)
[vscode+mermaid](https://www.agent-grow.com/self20percent/2020/03/05/%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%BF%E3%82%88%E3%81%86%EF%BC%81vscodemermaid/)
