import gdb

def check(output):
    if "SIGSEGV" in output or "SIGTRAP" in output:
        return False
    return True

for i in range(100):
    output = gdb.execute("run", to_string=True)
    print(f"===================== the {i}'th attempt ======================")
    if check(output):
        print(f"==================== on the {i}'th attempt! =====================")
        print(output)
        print("==================================================================")
        break
