export default function About() {
  return (
    <div className="container py-8 px-4 md:px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">About</h1>

      <div className="prose max-w-none dark:prose-invert">
        <p>
          Django REST Project is a powerful toolkit for building Web APIs with Django. It provides a flexible and
          easy-to-use framework for creating RESTful services.
        </p>

        <h2>Key Features</h2>

        <ul>
          <li>
            <strong>Serialization</strong> - Convert complex data types to native Python datatypes that can be easily
            rendered into JSON, XML, or other content types.
          </li>
          <li>
            <strong>Authentication</strong> - Support for various authentication methods including OAuth, JWT, and
            session-based authentication.
          </li>
          <li>
            <strong>Permissions</strong> - Fine-grained control over who can access your API.
          </li>
          <li>
            <strong>Viewsets and Routers</strong> - Quickly build API endpoints with minimal code.
          </li>
          <li>
            <strong>Browsable API</strong> - A web-based interface for exploring and testing your API.
          </li>
        </ul>

        <h2>Why Choose Django REST Project?</h2>

        <p>
          Django REST Project is built on top of Django, one of the most popular web frameworks for Python. It inherits
          Django's robustness, security, and scalability while providing a clean, intuitive API for building RESTful
          services.
        </p>

        <p>
          Whether you're building a simple API for a mobile app or a complex system with multiple microservices, Django
          REST Project provides the tools you need to build high-quality, maintainable APIs.
        </p>

        <h2>Get Started</h2>

        <p>
          Ready to build your API? Check out our <a href="/docs">documentation</a> to get started.
        </p>
      </div>
    </div>
  )
}

