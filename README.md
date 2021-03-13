# Markdown-Action-Create-Indexes

The github action that creates index pages for your project, the changes still need to be submitted afterwards

## Inputs

**folder**:
The folder path to start at
defaults to: $GITHUB_WORKSPACE

## Example usage

```yml
# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      - uses: actions/checkout@lastest       
      - uses: DaanV2/Markdown-Action-Create-Indexes@lastest

      - name: Commit changes
        run: |
          git add index.md
          git add **/index.md
          git commit -m "auto: Generated markdown index pages"
          git push
```