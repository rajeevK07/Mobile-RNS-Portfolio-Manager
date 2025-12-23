# 📱 RNS Portfolio Manager (Mobile)

[![Banner](https://github.com/rsksmart/rbtc-usdt0-lending-boilerplate/blob/main/rootstock-logo.png)](https://github.com/rsksmart/rbtc-usdt0-lending-boilerplate/blob/main/rootstock-logo.png)
> *Building the future of Bitcoin-secured Identity on Mobile.*

[![React Native](https://img.shields.io/badge/React_Native-v0.76+-blue.svg)](https://reactnative.dev)
[![Rootstock](https://img.shields.io/badge/Network-Rootstock_Testnet-orange.svg)](https://rootstock.io)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📖 Overview

The **RNS Portfolio Manager** is a native mobile application built with **React Native CLI**. It allows users to manage their **Rootstock Name Service (RNS)** domains directly from their phone.

Unlike standard web dApps, this project solves the complex challenges of **mobile blockchain development**:
* ✅ **Polyfilling Node.js Core Modules** (Crypto, Buffer, Stream) on iOS/Android.
* ✅ **Native WalletConnect Integration** via Reown AppKit.
* ✅ **Decentralized Indexing** using a custom Subgraph on The Graph.
* ✅ **Ethers.js v6** compatibility in a React Native environment.

---

## ✨ Key Features

* **🔐 Wallet Login:** Connect seamlessly using MetaMask, Rainbow, or Trust Wallet via **Reown AppKit**.
* **📓 Domain Resolution:** Instantly resolve `alice.rsk` to an address and vice versa.
* **📊 Portfolio Dashboard:** View all owned domains and their expiration dates in a sleek list.
* **⚡ One-Tap Transfers:** Transfer domain ownership to another wallet directly from the app.
* **🛡️ Network Guard:** Auto-detects wrong networks and prompts users to switch to **Rootstock Testnet**.

---

## 🛠 Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | React Native CLI | "Real" native development (No Expo Go). |
| **Language** | TypeScript | Type-safe, production-grade code. |
| **Blockchain** | Rootstock Testnet | Bitcoin sidechain compatibility. |
| **Connectivity** | Reown AppKit | (Formerly WalletConnect) for native signing. |
| **Data Layer** | The Graph (Apollo) | Custom Subgraph for querying domain data. |
| **Library** | Ethers.js v6 | For interaction with the RNS Registry Contract. |

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18 or newer)
* **CocoaPods** (for iOS dependencies)
* **Android Studio / Xcode** (for emulators)

### 1. Clone & Install
```bash
git clone (https://github.com/rajeevK07/Mobile-RNS-Portfolio-Manager)
cd Rnsmanager

# Install JS Dependencies
npm install

# Install iOS Pods (Mac Only)
cd ios && pod install && cd ..
