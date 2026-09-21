export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
  isQuickAction?: boolean;
}

export type QuickActionType = 
  | "TRACK_ORDER" 
  | "PRODUCT_HELP" 
  | "DELIVERY" 
  | "RETURNS" 
  | "PAYMENT" 
  | "ACCOUNT" 
  | "SUPPORT_TICKET";

export const chatService = {
  // Simulate network delay and response generation
  async processMessage(content: string, type?: QuickActionType): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (type) {
          switch (type) {
            case "TRACK_ORDER":
              resolve("I can help you track your order. Please enter your order number (e.g., DH-12345).");
              break;
            case "PRODUCT_HELP":
              resolve("Sure! What kind of product help do you need? Please provide the product name or style code.");
              break;
            case "DELIVERY":
              resolve("Standard delivery usually takes 3-5 business days. Do you have a specific order you're inquiring about?");
              break;
            case "RETURNS":
              resolve("We offer hassle-free returns within 7 days of delivery. Would you like to start a return for a recent order?");
              break;
            case "PAYMENT":
              resolve("Having trouble with a payment? Let me know what went wrong, but please don't share your full card details here.");
              break;
            case "ACCOUNT":
              resolve("I can help with account issues. What seems to be the problem? (e.g., password reset, address update)");
              break;
            case "SUPPORT_TICKET":
              resolve("I'll redirect you to our Support Ticket form so you can reach our team directly.");
              break;
            default:
              resolve("I'm here to help. Could you provide more details?");
          }
          return;
        }

        // Generic keyword matching for free-text input
        const lowerContent = content.toLowerCase();
        
        if (lowerContent.includes("order") && lowerContent.includes("dh-")) {
          resolve("Thanks! I'm checking the status of order " + content.match(/dh-\d+/i)?.[0] + " for you... It looks like it's currently in transit and should arrive in 2 days.");
        } else if (lowerContent.includes("order")) {
          resolve("Could you please provide your order number? It usually starts with DH-.");
        } else if (lowerContent.includes("hello") || lowerContent.includes("hi") || lowerContent.includes("hey")) {
          resolve("Hello! How can I assist you with your DripHunter experience today?");
        } else if (lowerContent.includes("refund")) {
          resolve("Refunds are typically processed within 5-7 business days after we receive your returned item.");
        } else if (lowerContent.includes("thank")) {
          resolve("You're welcome! Let me know if you need anything else.");
        } else if (lowerContent.includes("human") || lowerContent.includes("agent") || lowerContent.includes("support")) {
          resolve("I can connect you with a human agent, or you can click 'Create Support Ticket' from the quick actions.");
        } else {
          resolve("I understand. To serve you best, could you provide a bit more detail, or select one of our quick action options?");
        }
      }, 1000 + Math.random() * 1000); // 1-2 second mock delay
    });
  }
};
