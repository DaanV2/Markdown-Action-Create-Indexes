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
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2

      # Runs a single command using the runners shell
      - uses: DaanV2/Markdown-Action-Create-Indexes@v1.5.3
        with: 
          folder: ${{github.workspace}}

      - name: Commit changes
        run: |
          cd $GITHUB_WORKSPACE
          git config user.name bot
          git config user.email bot@example.com
          git add .
          git commit -m "auto: Generated markdown indexes pages"
          git push
```