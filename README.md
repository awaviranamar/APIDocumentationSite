# APIDocumentationSite
🎯 Project Overview
This project is a web-based API documentation viewer for the AssetWorks M5 API. It provides an interactive, user-friendly interface to explore and understand the comprehensive fleet and asset management API endpoints.

What is AssetWorks M5?
AssetWorks M5 is a comprehensive fleet and asset management system that helps organizations:

Track and manage vehicles, equipment, and other assets
Handle maintenance scheduling and work orders
Manage parts inventory and procurement
Monitor asset performance and costs
Generate reports and analytics
Project Purpose
This documentation site serves as a living reference for developers and system integrators who need to:

Understand available API endpoints
Learn about data structures and schemas
Test API functionality
Integrate with the AssetWorks M5 system
✨ Key Features
📖 Interactive API Explorer
Browse through hundreds of API endpoints organized by category with real-time testing capabilities.

⚡ Real-time Documentation
Displays current API specifications with detailed descriptions and automatic updates.

🔍 Schema Validation
Shows data structures, required fields, and validation rules for accurate integration.

🔎 Search Functionality
Quickly find specific endpoints or data types with powerful search capabilities.

🎨 Clean Interface
Modern, responsive design for easy navigation across all devices and screen sizes.

🔧 Developer Tools
Built-in testing interface with request/response examples and code generation.

🛠️ Technology Stack
Frontend
HTML5, CSS3, JavaScript

API Docs
OpenAPI 3.0 specification

UI Framework
Stoplight Elements API

Server
Node.js with HTTP server

Processing
Custom JavaScript utilities

⚡ What is Stoplight Elements?
Stoplight Elements Framework
Stoplight Elements is a powerful web component library that transforms OpenAPI specifications into beautiful, interactive API documentation. It's the core technology powering this documentation site.

🎨 Beautiful UI Components
Pre-built, customizable web components that render stunning API documentation with minimal setup.

📖 Interactive Documentation
Automatically generates interactive docs from OpenAPI specs with try-it-out functionality and code examples.

🔧 Easy Integration
Simple HTML tag integration - just include the library and add the <elements-api> component.

⚙️ Highly Configurable
Extensive customization options for layout, theming, and behavior to match your brand and needs.

<!-- Simple Stoplight Elements integration --> <script src="js/web-components.min.js"></script> <elements-api id="docs" hideSchemas="true" router="hash" layout="sidebar"> </elements-api>
🚀 Getting Started
# 1. Start the local server node index.js # 2. Open your browser http://localhost:3000 # 3. Explore the API documentation Browse through the interactive interface
Quick Start Steps:
Ensure Node.js is installed on your system
Navigate to the project directory
Run node index.js to start the server
Open http://localhost:3000 in your browser
Explore the API documentation through the interactive interface
🌐 API Coverage
The AssetWorks M5 API covers extensive functionality including:

🚗 Asset Management
Asset tracking and lifecycle
Equipment specifications
Location and position tracking
🔧 Maintenance Operations
Work order management
Preventive maintenance
Inspection management
📦 Parts & Inventory
Parts catalog and inventory
Purchase order management
Vendor relationships
👥 Human Resources
Employee management
Skill tracking
Time tracking
💰 Financial Management
Cost centers and accounting
Budget tracking
Financial reporting
📁 Project Structure
├── index.html # Main application entry point ├── index.js # Node.js server ├── 1.json # Primary API specification ├── 2.json # Additional schemas and components ├── css/ # Styling and themes ├── js/ # JavaScript libraries and components ├── utils/ # Utility functions and helpers └── docs/ # Project documentation
