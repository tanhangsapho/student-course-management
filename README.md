def generate_readme():
    project_name = input("Enter the project name: ")
    description = input("Enter a short description of the project: ")
    features = input("Enter the main features of the project (comma-separated): ").split(',')
    dependencies = input("Enter the installation command for dependencies: ")
    test_command = input("Enter the command to run tests: ")
    build_command = input("Enter the command to build the project: ")
    deploy_command = input("Enter the command to deploy the project: ")
    lint_command = input("Enter the command to run linters: ")
    format_command = input("Enter the command to format code: ")
    license_type = input("Enter the license type: ")
    contact_email = input("Enter the contact email: ")

    readme_content = f"""
# {project_name}

{description}

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

{description}

## Features

{"".join(f"- {feature.strip()}\n" for feature in features)}

## Installation

To get started with the {project_name} project, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/{project_name.lower().replace(" ", "-")}.git
    cd {project_name.lower().replace(" ", "-")}
    ```

2. **Install dependencies**:
    ```sh
    {dependencies}
    ```

## Usage

Here's a quick guide on how to use the {project_name} project:

1. **Running tasks**:
    ```sh
    # Run tests
    {test_command}

    # Build the project
    {build_command}

    # Deploy the project
    {deploy_command}
    ```

2. **Code Quality**:
    - Use linters and formatters included in the project to maintain code quality. Run them using the following commands:
    ```sh
    {lint_command}
    {format_command}
    ```

## Contributing

We welcome contributions to the {project_name} project! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request.

Please ensure your code adheres to our coding standards and includes appropriate tests.

## License

This project is licensed under the {license_type} License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, feel free to contact us at [your-email@example.com](mailto:{contact_email}).
"""

    with open("README.md", "w") as readme_file:
        readme_file.write(readme_content)

    print("README.md has been generated successfully!")

if __name__ == "__main__":
    generate_readme()
