import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, FileText, TrendingUp, Shield, Download, Search } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
     

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            Real Estate CRM Solution
          </Badge>
          <h1 className="text-5xl font-bold mb-6 text-balance bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Streamline Your Buyer Lead Management
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Capture, organize, and nurture your real estate leads with our comprehensive buyer intake system. From
            initial contact to closing, manage every step of your buyer journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/buyers/new">
              <Button size="lg" className="text-lg px-8">
                Add New Buyer <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/buyers">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                View All Buyers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">Everything You Need to Manage Buyers</h2>
            <p className="text-muted-foreground text-lg text-pretty max-w-2xl mx-auto">
              Comprehensive tools designed specifically for real estate professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Buyer Profiles</CardTitle>
                <CardDescription>
                  Complete buyer information including contact details, preferences, and financial qualifications
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Advanced Search</CardTitle>
                <CardDescription>
                  Quickly find buyers by name, location, budget, or any custom criteria with powerful filtering
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Document Management</CardTitle>
                <CardDescription>
                  Store and organize all buyer documents, pre-approval letters, and important paperwork
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>CSV Import/Export</CardTitle>
                <CardDescription>
                  Easily import existing buyer data or export for reporting and backup purposes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Lead Tracking</CardTitle>
                <CardDescription>
                  Monitor lead sources, conversion rates, and buyer journey progress with detailed analytics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Secure & Compliant</CardTitle>
                <CardDescription>
                  Enterprise-grade security with data encryption and compliance with real estate regulations
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6 text-balance">Ready to Transform Your Lead Management?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Join thousands of real estate professionals who trust BuyerLead Pro to manage their buyer relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/buyers/new">
              <Button size="lg" className="text-lg px-8">
                Start Managing Buyers <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/buyers">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">BuyerLead Pro</span>
            </div>
            <div className="text-muted-foreground">© 2024 BuyerLead Pro. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
