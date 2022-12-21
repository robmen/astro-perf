for /l %%k in (1980,1,1990) do (
  for /l %%j in (1,1,12) do (
    for /l %%i in (1,1,30) do (copy "1979-12-31-Test-Entry.md" "%%k-%%j-%%i-Test-Entry-%%kx%%jx%%i.md")
  )
)
