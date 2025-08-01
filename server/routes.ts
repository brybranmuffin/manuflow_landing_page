import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBetaSignupSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Beta signup endpoint
  app.post("/api/beta-signup", async (req, res) => {
    try {
      const validatedData = insertBetaSignupSchema.parse(req.body);
      const betaSignup = await storage.createBetaSignup(validatedData);
      res.status(201).json({ success: true, data: betaSignup });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          error: "Validation failed", 
          details: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: "Internal server error" 
        });
      }
    }
  });

  // Get all beta signups (for admin purposes)
  app.get("/api/beta-signups", async (req, res) => {
    try {
      const signups = await storage.getBetaSignups();
      res.json({ success: true, data: signups });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
