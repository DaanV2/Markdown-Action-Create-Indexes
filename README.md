# Markdown-Action-Create-Indexes

- [Markdown-Action-Create-Indexes](#markdown-action-create-indexes)
  - [Inputs](#inputs)
  - [Examples](#examples)
  - [Example usage](#example-usage)

This Github action creates markdown index pages for your project, the changes still need to be submitted afterward.

It creates a list of each markdown file in the folders and displays it under documents. For each subfolder that has documentation, then that folder is displayed in categories.

## Inputs

| Parameters     | Optional | Description                                                                                                                                    |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `folder`       | ✅        | The folder path to start at, default uses `${{github.workspace}}`                                                                              |
| `filename`     | ✅        | The filename of the generated file. default to `index`                                                                                         |
| `content-file` | ✅        | The filepath (relative to where the README.md or index.md) where content will be read from and input into index file, default to `.content.md` |

## Examples

![example](https://raw.githubusercontent.com/DaanV2/Markdown-Action-Create-Indexes/main/assets/example.PNG)

## Example usage

```yml
# This is a basic workflow to help you get started with Actions

name: Create markdown indexes

# Controls when the action will run. 
on:
  # Triggers the workflow on push or pull request events but only for the master branch
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      - uses: actions/checkout@v3

      # Runs a single command using the runners shell
      - name: Generated Markdown Readmes
        uses: DaanV2/Markdown-Action-Create-Indexes@v2.0.0

      - name: Commit changes
        continue-on-error: true
        run: |
          cd ${{github.workspace}}
          git config --global user.email "Bot@Example.com"
          git config --global user.name "DaanV2 Bot"
          git add .
          git commit -m "auto: Generated markdown indexes"
          git push
```

**With options**
```yaml
- name: Generated Markdown Readmes
  uses: DaanV2/Markdown-Action-Create-Indexes@v2.0.0
  with: 
    folder: ${{github.workspace}}
    filename: README.md
```
