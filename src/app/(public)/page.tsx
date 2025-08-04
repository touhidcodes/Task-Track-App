"use client";

import React, { useEffect, useState } from "react";
import {
  Zap,
  Target,
  MessageCircle,
  Shield,
  BarChart3,
  Globe,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const HomePage = () => {
  const { data: session, status } = useSession();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description:
        "Built with modern technologies for blazing-fast performance and real-time synchronization.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Smart Tracking",
      description:
        "Intelligent submission tracking with automated status updates and deadline management.",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Real-time Feedback",
      description:
        "Instant communication system enabling immediate feedback between instructors and students.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with role-based access control and encrypted data transmission.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics Dashboard",
      description:
        "Comprehensive analytics and reporting tools to track performance and identify improvements.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Cross-Platform",
      description:
        "Seamless experience across web, mobile, and desktop platforms with offline capability.",
    },
  ];

  const technologies = [
    "Next.js",
    "TypeScript",
    "React",
    "Prisma ORM",
    "MongoDB",
    "Tailwind CSS",
    "Shadcn/ui",
    "Node.js",
  ];

  const benefits = [
    "Streamlined assignment workflow",
    "Real-time collaboration",
    "Automated progress tracking",
    "Instant feedback system",
  ];

  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Simplifying academic
            <br />
            <span className="text-primary">assignment management</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            A modern, intuitive platform that connects educators and students
            through seamless assignment tracking and real-time collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={session ? "/assignments" : "/auth"}>
              <button className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
            <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Assignment Track bridges the gap between educators and students,
                creating a seamless ecosystem where assignments flow
                effortlessly from creation to completion and evaluation.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We believe technology should enhance learning, not complicate
                it. Our platform eliminates administrative overhead while
                providing powerful insights into academic progress.
              </p>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
                  <div className="w-60 h-60 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                    <div className="w-40 h-40 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                      <Target className="w-16 h-16 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Assignment Track?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the features that make assignment management effortless
              and efficient
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Built with Modern Technology
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Powered by cutting-edge tools and frameworks
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet the Developer</h2>
            <p className="text-xl text-muted-foreground">
              Passionate about creating solutions for modern education
            </p>
          </div>

          <div className="flex justify-center">
            <div className="rounded-lg border bg-card p-8 shadow-sm max-w-md text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-primary-foreground text-2xl font-bold">
                  T
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Touhidur Zaman</h3>
              <p className="text-primary font-medium mb-4">
                Full Stack Developer
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Dedicated to building innovative educational technology
                solutions that empower both educators and students to achieve
                their full potential.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="inline-flex items-center justify-center rounded-md h-9 w-9 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                  <Github className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center justify-center rounded-md h-9 w-9 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                  <Linkedin className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center justify-center rounded-md h-9 w-9 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#1C2D37] text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Assignment Management?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of educators and students who have already
            streamlined their academic workflow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              Get Started Free
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 bg-transparent px-8 py-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              Watch Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
