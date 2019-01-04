using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace SignalRChat.Hubs
{
    public static class UserHandler
    {
        public static Dictionary<string, List<string>> ConnectionGroups = new Dictionary<string, List<string>>();

    }
    public class ChatHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {

            List<string> groups= new List<string>();
            groups = UserHandler.ConnectionGroups[Context.ConnectionId];
            
            Console.WriteLine( "\n\n\n");
            for (int i = 0; i < groups.Count; i++)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, groups[i]);
                Console.WriteLine( "Removed Connection: "  + Context.ConnectionId + " from group: " + groups[i]);
            }
            Console.WriteLine( "\n\n\n");
            
            UserHandler.ConnectionGroups.Remove(Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task JoinGameSession(string[] ids)
        {
            string gameId = ids[0];
            string userId = ids[1];
            List<string> groups= new List<string>();
            groups.Add(userId);
            groups.Add(gameId);

            await Groups.AddToGroupAsync(Context.ConnectionId, userId);
            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
            UserHandler.ConnectionGroups.Add(Context.ConnectionId,groups);
            Console.WriteLine( "\n\n\nAdded Connection: "  + Context.ConnectionId + " to groups: " + gameId + " & " + userId + "\n\n\n");

            await Clients.All.SendAsync("incomingMessage", "Joined Game Session: " + gameId + "\nUser ID: " + userId + "\nConnection ID: " + Context.ConnectionId);
        }

        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("incomingMessage", message + " Bitch!!");
        }
        
        public async Task Hello(string message)
        {
            string hold = message.TrimEnd('}');
            hold = hold + ",\"connectionID\":\"" + Context.ConnectionId + "\"}";
            Console.WriteLine( "\n\n\nData: "  + hold + "\n\n\n");
            await Clients.All.SendAsync("receiveMessage", hold);
        }
    }
    
}