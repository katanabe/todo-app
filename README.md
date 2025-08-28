# Todo App Monorepo

**Turborepo**で構成されたモノリポ構成の Todo アプリケーション

## 技術スタック

### 全体構成
- **Turborepo** - モノリポ管理・高速ビルド
- **Bun** - 超高速 JavaScript/TypeScript ランタイム
- **TypeScript** - 型安全性
- **Biome** - 高速リンター・フォーマッター（ESLint/Prettier 代替）

### フロントエンド
- **Next.js** (React) - ウェブフレームワーク
- **Tailwind CSS** - CSS フレームワーク
- **Hono RPC Client** - 型安全な API 通信

### バックエンド  
- **Bun** - TypeScript 実行環境（ホットリロード）
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

これによりすべての workspace の依存関係が超高速でインストールされます。

### 3. データベースの設定

#### MySQL コンテナを起動
```bash
# Docker デーモンを起動してから
docker-compose up -d mysql
```

#### データベーススキーマを適用
```bash
bun run db:generate
bun run db:push
```

これにより MySQL データベース（`todoapp`）にテーブルが作成されます。

### 4. 開発サーバーの起動（一括）

```bash
bun run dev
```

これにより以下がすべて**並列で超高速**起動します：
- **バックエンド**: Bun ホットリロード、ポート 3001
- **フロントエンド**: Next.js Turbopack、ポート 3000

### 5. アプリケーションへのアクセス

ブラウザで http://localhost:3000 にアクセス

## 開発環境の停止

### サーバーの停止
開発サーバーを停止：
```bash
# Ctrl + C で停止、または
bun run clean
```

### MySQL コンテナの停止
```bash
# コンテナを停止
docker-compose down

# コンテナを停止してデータも削除
docker-compose down -v
```

## Turborepo コマンド

### 全体操作
```bash
bun run build      # すべてのパッケージを並列ビルド
bun run dev        # すべての開発サーバーを超高速起動  
bun run lint       # Biome によるコード品質チェック
bun run lint:fix   # リント問題を自動修正
bun run format     # コードフォーマット確認
bun run format:fix # コードを自動フォーマット  
bun run check      # リント + フォーマット一括チェック
bun run check:fix  # リント + フォーマット自動修正
bun run clean      # ビルドファイルを削除
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

### REST API（型安全な Hono RPC）
- `GET /api/todos` - Todo 一覧取得
- `GET /api/todos/:id` - Todo 詳細取得
- `POST /api/todos` - Todo 作成（Zod バリデーション）
- `PUT /api/todos/:id` - Todo 更新（Zod バリデーション）  
- `DELETE /api/todos/:id` - Todo 削除

### ヘルスチェック
- `GET /health` - サーバー状態確認

## データベースについて

### 現在の設定
- **MySQL** を使用（Docker Compose）
- **データベース名**: `todoapp`
- **ユーザー**: `todouser` / **パスワード**: `todopass`
- **ポート**: `3306`
- データは Docker ボリュームに永続化

### SQLite に戻す場合（オプション）
開発環境で SQLite を使いたい場合：

```bash
# Prisma スキーマを変更
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
├── package.json            # Turborepo 設定
├── turbo.json              # Turborepo タスク設定
├── biome.jsonc             # Biome 設定（リンター・フォーマッター）
├── docker-compose.yml      # MySQL 用
└── apps/                   # アプリケーション
    ├── frontend/          # Next.js フロントエンド
    │   ├── src/
    │   │   ├── app/      # Next.js App Router
    │   │   ├── components/ # React コンポーネント
    │   │   └── lib/      # API クライアント（Hono RPC）
    │   └── package.json
    └── backend/           # Hono バックエンド
        ├── src/
        │   ├── features/  # Feature 別モジュール
        │   │   └── todo/  # Todo 機能
        │   │       ├── todo.controller.ts
        │   │       ├── todo.service.ts
        │   │       ├── todo.routes.ts
        │   │       └── todo.validation.ts
        │   ├── shared/    # 共通機能
        │   │   ├── database/
        │   │   ├── middleware/
        │   │   └── utils/
        │   └── index.ts   # API サーバー + 型エクスポート
        ├── prisma/
        │   └── schema.prisma # データベーススキーマ
        ├── .env          # 環境変数
        └── package.json
```

## アーキテクチャの特徴

### 🏗️ **Feature 分割設計**
- 機能ごとにモジュール化（`features/todo/`）
- 単一責任の原則に従った構造
- 新機能追加時の拡張性が高い

### 🔒 **End-to-End 型安全性（Hono RPC）**
- バックエンドの API 型を自動生成・エクスポート
- フロントエンドで`hc<ApiRoutes>()`による型安全な通信
- 共通パッケージ不要、API の変更が自動的にフロントエンドに反映

### 🛡️ **バリデーション**
- **Zod**によるリクエストスキーマ検証
- **@hono/zod-validator**でミドルウェア化
- 型安全性とランタイム安全性の両立

### ⚡ **コード品質管理（Biome）**
- ESLint/Prettier を統合した高速リンター・フォーマッター
- Frontend/Backend 別の細やかなルール設定
- Git 連携とインポート自動整理機能

### 📦 **依存関係**
- **@todo-app/frontend** → **@todo-app/backend** (型定義のみ)
- 循環依存なし、シンプルな依存グラフ

## メリット

✅ **超高速開発**: Bun の爆速 TypeScript 実行・ホットリロード  
✅ **型安全性**: Hono RPC による End-to-End 型安全性  
✅ **コード品質**: Biome による高速リンティング・フォーマット  
✅ **バリデーション**: Zod によるスキーマ駆動開発  
✅ **Feature 拡張**: 新機能は`features/`配下に追加するだけ  
✅ **保守性**: 単一責任・低結合な設計  
✅ **開発効率**: API の変更が即座にフロントエンドに反映