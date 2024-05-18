import os
import sys
import time
import threading
from colorama import init, Fore, Style
import socket
import itertools

def get_local_ip():
    try:
        
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))  #  Google's DNS server
        local_ip = s.getsockname()[0]
        s.close()
        return local_ip
    except Exception as e:
        print(Fore.RED + "Error:", e)
        return None

time.sleep(5)

def show_loading():
    animations = itertools.cycle(["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"])
    for _ in range(25):
        sys.stdout.write("\r" + Fore.GREEN + "Starting server " + next(animations) + Style.RESET_ALL)
        sys.stdout.flush()
        time.sleep(0.1)
    print("\r" + Fore.GREEN + "Starting server " + " " * 10 + Fore.GREEN + "✔" + Style.RESET_ALL)

def start_server(local_ip, port):
    try:
        
        command = f"python3 -m http.server --bind {local_ip} {port} >/dev/null 2>&1"
        os.system(command)
    except KeyboardInterrupt:
        print(Fore.YELLOW + "\nServer stopped.")

def main():
    init(autoreset=True)  

    
    os.system('cls' if os.name == 'nt' else 'clear')

    print(Fore.YELLOW + "=" * 60)
    print(Fore.YELLOW + " " * 18 + "HTTP Server Script by karthikraja" + " " * 18)
    print(Fore.YELLOW + "=" * 60)

    
    local_ip = get_local_ip()
    if not local_ip:
        print(Fore.RED + "Failed to retrieve local IP address. Exiting.")
        return

    
    PORT = 8080

    
    server_thread = threading.Thread(target=start_server, args=(local_ip, PORT))
    server_thread.start()

    
    show_loading()

    
    time.sleep(5)

    
    os.system('cls' if os.name == 'nt' else 'clear')

    print(Fore.YELLOW + "=" * 60)
    print(Fore.YELLOW + " " * 18 + "HTTP Server Script by karthikraja" + " " * 18)
    print(Fore.YELLOW + "=" * 60)
    print("\n\n")  

    
    print(Fore.CYAN + f"Access the server at: http://{local_ip}:{PORT}")

    try:
        
        while True:
            user_input = input(Fore.CYAN + "Enter 'exit' to stop the server: ")
            if user_input.lower() == 'exit':
                os.system("pkill -f 'python3 -m http.server'")
                print(Fore.YELLOW + "Server stopped.")
                break
    except KeyboardInterrupt:
        print(Fore.YELLOW + "\nServer stopped.")

    
    server_thread.join()

if __name__ == "__main__":
    main()
