import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Zap, Rocket, Shield, Play, Menu, CheckCircle } from "lucide-react";

const betaSignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().min(1, "Organization is required"),
  message: z.string().optional(),
});

type BetaSignupForm = z.infer<typeof betaSignupSchema>;

const teamMembers = [
  {
    name: "Alex Chen",
    role: "CEO & Co-founder",
    bio: "Former VP of Engineering at TechCorp. 10+ years building scalable platforms.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    name: "Sarah Martinez",
    role: "CTO & Co-founder",
    bio: "AI researcher from Stanford. Published 20+ papers on machine learning optimization.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    name: "David Kim",
    role: "Head of Design",
    bio: "Award-winning UX designer. Previously at Apple and Google, crafting intuitive experiences.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    name: "Emily Rodriguez",
    role: "VP of Marketing",
    bio: "Growth marketing expert who scaled 3 startups from 0 to $100M+ valuations.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    name: "Michael Thompson",
    role: "Lead Engineer",
    bio: "Full-stack architect with expertise in distributed systems and cloud infrastructure.",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    name: "Jessica Wang",
    role: "Head of Operations",
    bio: "Operations strategist from McKinsey. Expert in scaling teams and optimizing processes.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
];

export default function LandingStatic() {
  const [activeSection, setActiveSection] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<BetaSignupForm>({
    resolver: zodResolver(betaSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      message: "",
    },
  });

  const onSubmit = async (data: BetaSignupForm) => {
    setIsSubmitting(true);
    
    try {
      // Using Netlify Forms for form submission
      const formData = new FormData();
      formData.append('form-name', 'beta-signup');
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('organization', data.organization);
      formData.append('message', data.message || '');

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your beta access request has been submitted. We'll get back to you within 24 hours.",
        });
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["product", "signup", "team"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      {/* Hidden form for Netlify Forms */}
      <form name="beta-signup" data-netlify="true" style={{ display: 'none' }}>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="organization" />
        <textarea name="message"></textarea>
      </form>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Zap className="text-blue-400 text-2xl" />
              <span className="text-xl font-bold text-slate-50">TechFlow</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("product")}
                className={`transition-colors duration-200 ${
                  activeSection === "product" ? "text-blue-400" : "text-slate-300 hover:text-blue-400"
                }`}
              >
                Product
              </button>
              <button
                onClick={() => scrollToSection("signup")}
                className={`transition-colors duration-200 ${
                  activeSection === "signup" ? "text-blue-400" : "text-slate-300 hover:text-blue-400"
                }`}
              >
                Beta Access
              </button>
              <button
                onClick={() => scrollToSection("team")}
                className={`transition-colors duration-200 ${
                  activeSection === "team" ? "text-blue-400" : "text-slate-300 hover:text-blue-400"
                }`}
              >
                Team
              </button>
            </div>
            <button className="md:hidden text-slate-300 hover:text-blue-400">
              <Menu className="text-xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900/20 pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-50 to-blue-400 bg-clip-text text-transparent">
            Revolutionary Solutions for Modern Startups
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your workflow with cutting-edge technology designed for the next generation of businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => scrollToSection("signup")}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Get Early Access
            </Button>
            <Button
              onClick={() => scrollToSection("product")}
              variant="outline"
              className="border-slate-600 hover:border-blue-500 text-slate-300 hover:text-blue-400 font-semibold py-4 px-8 rounded-lg transition-all duration-200"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-50">Revolutionary Product Suite</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Experience the future of business automation with our comprehensive platform designed for modern enterprises.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-50">Smart Automation Platform</h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                Our AI-powered platform streamlines complex workflows, reduces manual tasks by 80%, and scales effortlessly with your business growth. Built for teams who demand excellence.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    <Rocket className="text-blue-400 text-2xl mb-2" />
                    <h4 className="font-semibold text-slate-50 mb-1">Lightning Fast</h4>
                    <p className="text-sm text-slate-400">10x faster processing</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    <Shield className="text-blue-400 text-2xl mb-2" />
                    <h4 className="font-semibold text-slate-50 mb-1">Enterprise Security</h4>
                    <p className="text-sm text-slate-400">Bank-level encryption</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Modern dashboard interface with analytics"
                className="rounded-xl shadow-2xl w-full h-auto border border-slate-700"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Mobile app interface design"
                  className="rounded-lg w-full h-48 object-cover mb-4"
                />
                <h4 className="text-xl font-semibold text-slate-50 mb-2">Mobile First</h4>
                <p className="text-slate-300">Responsive design that works perfectly on any device, anywhere.</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Network visualization with connected nodes"
                  className="rounded-lg w-full h-48 object-cover mb-4"
                />
                <h4 className="text-xl font-semibold text-slate-50 mb-2">Smart Integrations</h4>
                <p className="text-slate-300">Connect with 500+ tools and services through our powerful API ecosystem.</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Futuristic tech interface with digital elements"
                  className="rounded-lg w-full h-48 object-cover mb-4"
                />
                <h4 className="text-xl font-semibold text-slate-50 mb-2">AI-Powered</h4>
                <p className="text-slate-300">Machine learning algorithms that adapt and improve with every interaction.</p>
              </CardContent>
            </Card>
          </div>

          {/* Demo Video Section */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-50 mb-8">See It In Action</h3>
            <Card className="max-w-4xl mx-auto bg-slate-800 border-slate-700">
              <CardContent className="p-8">
                <div className="aspect-video bg-slate-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                  <div className="relative text-center">
                    <Play className="text-6xl text-blue-400 mb-4" />
                    <p className="text-xl text-slate-300">Demo Video Coming Soon</p>
                    <p className="text-slate-400 mt-2">Watch our 3-minute product overview</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Beta Signup Section */}
      <section id="signup" className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-50">Join the Beta Program</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Be among the first to experience the future of business automation. Limited spots available.
            </p>
          </div>

          <Card className="bg-slate-800 border-slate-700 shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <input type="hidden" name="form-name" value="beta-signup" />
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-slate-300 mb-2">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      {...form.register("name")}
                      className="bg-slate-700 border-slate-600 text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-300 mb-2">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      className="bg-slate-700 border-slate-600 text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@company.com"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="organization" className="text-slate-300 mb-2">
                    Organization *
                  </Label>
                  <Input
                    id="organization"
                    {...form.register("organization")}
                    className="bg-slate-700 border-slate-600 text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your company or organization"
                  />
                  {form.formState.errors.organization && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.organization.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message" className="text-slate-300 mb-2">
                    Tell us about your use case
                  </Label>
                  <Textarea
                    id="message"
                    {...form.register("message")}
                    className="bg-slate-700 border-slate-600 text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
                    placeholder="What challenges are you looking to solve? How would our platform help your organization?"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none"
                >
                  {isSubmitting ? "Submitting..." : "Request Beta Access"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-50">Meet Our Team</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              World-class talent from leading technology companies, united by a vision to transform how businesses operate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 hover:border-blue-500/50 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-slate-600 group-hover:border-blue-400 transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-50 mb-2">{member.name}</h3>
                  <p className="text-blue-400 font-semibold mb-4">{member.role}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Zap className="text-blue-400 text-2xl" />
              <span className="text-xl font-bold text-slate-50">TechFlow</span>
            </div>
            <div className="text-slate-400 text-sm">
              © 2024 TechFlow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}