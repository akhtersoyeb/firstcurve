import PublicNavbar from "@/components/PublicNavbar"
import UserNavbar from "@/components/user-navbar"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient as createClientServer } from "@/lib/supabase/server-props"
import Link from "next/link"

export async function getServerSideProps(context) {
  const supabase = createClientServer(context)

  const { data: userData, error: userError } = await supabase.auth.getUser()

  return {
    props: {
      user: userData.user,
    },
  }
}

export default function ContactUsPage({ user }) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!formState.name || !formState.email || !formState.message) {
      setError("Please fill out all required fields")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formState.email)) {
      setError("Please enter a valid email address")
      return
    }

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
      setError("")
    }, 1000)
  }

  return (
    <>
      {user ? <UserNavbar /> : <PublicNavbar />}

      <div className="container mx-auto py-10 pt-20">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-muted-foreground max-w-[700px]">
            Have questions about Firstcurve? We're here to help. Reach out to
            our team.
          </p>
        </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Here's how you can reach us directly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground mt-1">
                      sksoyebakhter2003@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Twitter className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Twitter</h3>
                    <Link href="https://twitter.com/sooooyeb" className="text-muted-foreground mt-1">
                      @sooooyeb
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Office</h3>
                    <p className="text-muted-foreground mt-1">
                      Bhupatinagar, East Medinipur, 721425
                    </p>
                    <p className="text-muted-foreground">
                      West Bengal, India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
      </div>
    </>
  )
}
