# Todo App Monorepo

**Turborepo**で構成されたモノリポ構成のTodoアプリケーション

## 技術スタック

### 全体構成
- **Turborepo** - モノリポ管理・高速ビルド
- **Bun** - 超高速JavaScript/TypeScriptランタイム
- **TypeScript** - 型安全性

### フロントエンド
- **Next.js** (React) - ウェブフレームワーク
- **Tailwind CSS** - CSSフレームワーク
- **Hono RPC Client** - 型安全なAPI通信

### バックエンド  
- **Bun** - TypeScript実行環境（ホットリロード）
- **Hono** - 軽量ウェブフレームワーク + RPC
- **Zod** - スキーマバリデーション
- **Prisma** - ORM
- **MySQL** - データベース（Docker）

## 開発環境の起動手順

### 1. リポジトリのクローン
```bash
git clone <repository-url>
cd todo-app
```

### 2. 依存関係のインストール（一括）

```bash
bun install
```

これによりすべてのworkspaceの依存関係が超高速でインストールされます。

### 3. データベースの設定

#### MySQLコンテナを起動
```bash
# Dockerデーモンを起動してから
docker-compose up -d mysql
```

#### データベーススキーマを適用
```bash
bun run db:generate
bun run db:push
```

これによりMySQLデータベース（`todoapp`）にテーブルが作成されます。

### 4. 開発サーバーの起動（一括）

```bash
bun run dev
```

これにより以下がすべて**並列で超高速**起動します：
- **バックエンド**: Bunホットリロード、ポート3001
- **フロントエンド**: Next.js Turbopack、ポート3000

### 5. アプリケーションへのアクセス

ブラウザで http://localhost:3000 にアクセス

## 開発環境の停止

### サーバーの停止
開発サーバーを停止：
```bash
# Ctrl + C で停止、または
bun run clean
```

### MySQLコンテナの停止
```bash
# コンテナを停止
docker-compose down

# コンテナを停止してデータも削除
docker-compose down -v
```

## Turborepoコマンド

### 全体操作
```bash
bun run build    # すべてのパッケージを並列ビルド
bun run dev      # すべての開発サーバーを超高速起動  
bun run lint     # 全体でリント実行
bun run clean    # ビルドファイルを削除
```

### 個別パッケージ操作
```bash
# 特定のパッケージのみ実行
bunx turbo run dev --filter=@todo-app/backend
bunx turbo run build --filter=@todo-app/frontend

# 複数パッケージを指定
bunx turbo run build --filter=@todo-app/frontend --filter=@todo-app/backend
```

## API エンドポイント

### REST API（型安全なHono RPC）
- `GET /api/todos` - Todo一覧取得
- `GET /api/todos/:id` - Todo詳細取得
- `POST /api/todos` - Todo作成（Zodバリデーション）
- `PUT /api/todos/:id` - Todo更新（Zodバリデーション）  
- `DELETE /api/todos/:id` - Todo削除

### ヘルスチェック
- `GET /health` - サーバー状態確認

## データベースについて

### 現在の設定
- **MySQL** を使用（Docker Compose）
- **データベース名**: `todoapp`
- **ユーザー**: `todouser` / **パスワード**: `todopass`
- **ポート**: `3306`
- データはDockerボリュームに永続化

### SQLiteに戻す場合（オプション）
開発環境でSQLiteを使いたい場合：

```bash
# Prismaスキーマを変更
# backend/prisma/schema.prisma の provider を "sqlite" に変更

# 環境変数を変更
# backend/.env の DATABASE_URL を以下に変更：
# DATABASE_URL="file:./prisma/dev.db"

# データベーススキーマを適用
cd backend
npm run db:generate
npm run db:push
```

## 環境変数

### backend/.env
```
DATABASE_URL="mysql://todouser:todopass@localhost:3306/todoapp"
PORT=3001
```

## モノリポ構造

```
todo-app/                    # ルート
├── package.json            # Turborepo設定
├── turbo.json              # Turborepoタスク設定
├── docker-compose.yml      # MySQL用
└── apps/                   # アプリケーション
    ├── frontend/          # Next.js フロントエンド
    │   ├── src/
    │   │   ├── app/      # Next.js App Router
    │   │   ├── components/ # React コンポーネント
    │   │   └── lib/      # APIクライアント（Hono RPC）
    │   └── package.json
    └── backend/           # Hono バックエンド
        ├── src/
        │   ├── features/  # Feature別モジュール
        │   │   └── todo/  # Todo機能
        │   │       ├── todo.controller.ts
        │   │       ├── todo.service.ts
        │   │       ├── todo.routes.ts
        │   │       └── todo.validation.ts
        │   ├── shared/    # 共通機能
        │   │   ├── database/
        │   │   ├── middleware/
        │   │   └── utils/
        │   └── index.ts   # APIサーバー + 型エクスポート
        ├── prisma/
        │   └── schema.prisma # データベーススキーマ
        ├── .env          # 環境変数
        └── package.json
```

## アーキテクチャの特徴

### 🏗️ **Feature分割設計**
- 機能ごとにモジュール化（`features/todo/`）
- 単一責任の原則に従った構造
- 新機能追加時の拡張性が高い

### 🔒 **End-to-End型安全性（Hono RPC）**
- バックエンドのAPI型を自動生成・エクスポート
- フロントエンドで`hc<ApiRoutes>()`による型安全な通信
- 共通パッケージ不要、APIの変更が自動的にフロントエンドに反映

### 🛡️ **バリデーション**
- **Zod**によるリクエストスキーマ検証
- **@hono/zod-validator**でミドルウェア化
- 型安全性とランタイム安全性の両立

### 📦 **依存関係**
- **@todo-app/frontend** → **@todo-app/backend** (型定義のみ)
- 循環依存なし、シンプルな依存グラフ

## メリット

✅ **超高速開発**: Bunの爆速TypeScript実行・ホットリロード  
✅ **型安全性**: Hono RPCによるEnd-to-End型安全性  
✅ **バリデーション**: Zodによるスキーマ駆動開発  
✅ **Feature拡張**: 新機能は`features/`配下に追加するだけ  
✅ **保守性**: 単一責任・低結合な設計  
✅ **開発効率**: APIの変更が即座にフロントエンドに反映