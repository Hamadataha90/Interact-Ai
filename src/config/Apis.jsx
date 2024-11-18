

// export const apiKey = "AIzaSyCW0g_xJcP8WecPbN8SkR8bcASuTkaaCxI"; 
// export const apiKey1 = "AIzaSyCJAOC4mj26fkgFcOQKMAWc698Tp75bs0g"; 
// export const apiKey2 = "AIzaSyA60dkJ_92aze2kN7pXdqlrsQTIq11HZ1M"; 
// export const apiKey3= "AIzaSyAMxplF1SRnl_38mJabGK5iQuMIyk8-KJo"; 



export const apiKeys = {
    google: [
        import.meta.env.VITE_API_KEY,
        import.meta.env.VITE_API_KEY_1,
        import.meta.env.VITE_API_KEY_2,
        import.meta.env.VITE_API_KEY_3,
    ],
    openAI: [
        import.meta.env.VITE_OPENAI_API_KEY,
        import.meta.env.VITE_OPENAI_API_KEY_1,
        import.meta.env.VITE_OPENAI_API_KEY_2,
        import.meta.env.VITE_OPENAI_API_KEY_3,
    ],
    orgId: import.meta.env.VITE_ORG_ID,
};





