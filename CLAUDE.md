# CLAUDE.md

このファイルは、このリポジトリのコードを扱う際のClaude Code (claude.ai/code) へのガイダンスを提供します。
## 開発コマンド

### 主要コマンド
- `bun run dev` - 全ての開発サーバーを起動 (フロントエンド: :3000, バックエンド: :3001)
- `bun run build` - 全パッケージを並列ビルド
- `bun run start` - プロダクションサーバーを起動
- `bun run clean` - ビルド成果物をクリーンアップし、プロセスを停止

### コード品質
- `bun run lint` - 全アプリでBiomeリンティングを実行
- `bun run lint:fix` - リンティング問題を自動修正
- `bun run format:fix` - コードを自動フォーマット
- `bun run check:fix` - リント + フォーマット修正を同時実行

### データベース操作
- `bun run db:generate` - Prismaクライアントを生成
- `bun run db:push` - スキーマ変更をデータベースにプッシュ
- `docker-compose up -d mysql` - MySQLコンテナを起動
- `docker-compose down` - MySQLコンテナを停止

### 個別パッケージコマンド
- `bunx turbo run dev --filter=@todo-app/backend` - バックエンドのみ実行
- `bunx turbo run dev --filter=@todo-app/frontend` - フロントエンドのみ実行

## アーキテクチャ概要

これは2つのメインアプリケーションを持つTurborepoモノレポです：

### バックエンド (`apps/backend/`)
- **フレームワーク**: Hono (軽量Webフレームワーク)
- **ランタイム**: Bun (ホットリロード付き)
- **データベース**: Prisma ORM + MySQL (Docker)
- **バリデーション**: Zodスキーマ + @hono/zod-validator
- **アーキテクチャ**: `src/features/`配下の機能ベースモジュール

### フロントエンド (`apps/frontend/`)
- **フレームワーク**: Next.js 15 (App Router + Turbopack)
- **UI**: Tailwind CSS v4
- **APIクライアント**: Hono RPCクライアント (エンドツーエンド型安全性)
- **依存関係**: ワークスペース参照経由でバックエンド型をインポート

### 主要なアーキテクチャパターン

#### 機能モジュール構造
各機能（例：`features/todo/`）は以下のパターンに従います：
- `*.controller.ts` - リクエストハンドラー
- `*.routes.ts` - バリデーション付きルート定義
- `*.service.ts` - ビジネスロジック
- `*.validation.ts` - Zodスキーマ

#### 型安全性 (Hono RPC)
- バックエンドが`src/index.ts`から`ApiRoutes`型をエクスポート
- フロントエンドが`hc<ApiRoutes>()`クライアント用にこの型をインポート
- 共有パッケージなしでエンドツーエンドの型安全性を実現
- API変更が自動的にフロントエンドの型に伝播

#### バックエンド共有モジュール
- `shared/database/` - Prisma接続
- `shared/middleware/` - CORS、エラーハンドリング、ロギング
- `shared/utils/` - レスポンスユーティリティ

## コード規約

### Biome設定
- **リンティング**: フロントエンド/バックエンドのオーバーライド付き厳格ルール
- **フォーマット**: シングルクォート、セミコロン、2スペースインデント
- **インポート整理**: `organizeImports: "on"`で自動化
- バックエンドはフロントエンドより厳格な`any`型制限

### データベーススキーマ
- `apps/backend/prisma/schema.prisma`に単一の`Todo`モデル
- `DATABASE_URL`経由で接続するMySQLプロバイダー
- 自動生成タイムスタンプとインクリメンタルID

## 開発ワークフロー

1. **セットアップ**: `bun install` (全ワークスペース依存関係をインストール)
2. **データベース**: `docker-compose up -d mysql`でMySQLを起動、その後`bun run db:generate && bun run db:push`
3. **開発**: `bun run dev`でフロントエンドとバックエンドを同時起動
4. **コード品質**: コミット前に`bun run check:fix`を実行

## 環境設定

### バックエンド環境変数 (`.env`)
必要な環境変数は`.env.example`を参照してください。
開発環境では以下の設定が必要です：
- `DATABASE_URL` - MySQL接続文字列
- `PORT` - バックエンドサーバーのポート番号（デフォルト: 3001）

### Docker Compose
- 永続ボリューム付きMySQLサービス
- データベース: `todoapp`、ユーザー: `todouser/todopass`
- ポート: 3306

## テスト

### テストコマンド
- `bun run test` - モノレポ内の全テストを実行
- `bun run test:watch` - ウォッチモードでテストを実行
- `bun test` (バックエンド内) - Bunテストランナーでバックエンドテストを実行
- `jest` (フロントエンド内) - Jestでフロントエンドテストを実行

### テストセットアップ
- **バックエンド**: Bunの組み込みテストランナーを使用
- **フロントエンド**: ReactコンポーネントテスティングのためにJestを設定
- Turboを使用してパッケージ間でテストを並列実行

## プロジェクト設定

### Biome設定 (`biome.jsonc`)
- 設定ファイルはJSONC形式（コメント付きJSON）を使用
- ワークスペース対応のリンティングとフォーマット
- フロントエンドとバックエンド間で一貫したコードスタイル

### Turbo設定
- 開発効率のための並列タスク実行
- パイプライン依存関係の自動管理
- 高速リビルドのためのキャッシュ有効化

## トラブルシューティング

### よくある問題
- **ポート競合**: `dev`スクリプトはポート3000/3001の既存プロセスを終了します
- **データベース接続**: データベースコマンドの前にDockerが起動していることを確認
- **型エラー**: スキーマ変更後は`bun run db:generate`を実行
- **ホットリロードの問題**: 変更が検出されない場合は開発サーバーを再起動

### クリーンステート
- `bun run clean` - 全プロセスを停止し、ビルド成果物をクリーンアップ
- `docker-compose down -v` - Dockerコンテナとボリュームを削除
- `rm -rf node_modules && bun install` - 依存関係を新規インストール