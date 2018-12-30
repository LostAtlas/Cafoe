using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace SignalRChat.Hubs
{
    public static class UserHandler
    {
        public static HashSet<string> ConnectedIds = new HashSet<string>();
    }
    public class ChatHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            UserHandler.ConnectedIds.Add(Context.ConnectionId);
            Console.WriteLine( "\n\n\n"  + UserHandler.ConnectedIds.Count + "\n\n\n");
            await base.OnConnectedAsync();
        }
        public async Task JoinGameSession(string[] ids)
        {
            string gameId = ids[0];
            string userId = ids[1];
            await Clients.All.SendAsync("incomingMessage", "Joined Game Session: " + gameId + "\nUser ID: " + userId + "\nConnection ID: " + Context.ConnectionId);
        }

        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("incomingMessage", message + " Bitch!!");
        }
        
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            UserHandler.ConnectedIds.Remove(Context.ConnectionId);
            Console.WriteLine( "\n\n\n"  + UserHandler.ConnectedIds.Count + "\n\n\n");
            await base.OnDisconnectedAsync(exception);
        }
    }
}