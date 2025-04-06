import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import UserNavbar from "@/components/user-navbar"
import { createClient } from "@/lib/supabase/component"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const supabase = createClient()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error(error)
      }
      setUser(data?.user)
    }
    fetchUser()
  }, [])
  return (
    <>
      <UserNavbar />
      <div className="container mx-auto py-10 pt-20">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

        {/* <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6"> */}
        <Card className="border-none shadow-none">
          {/* <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </CardHeader> */}
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div>
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    {user?.email.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-2 w-md">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="border-none shadow-none p-0"
                  disabled={true}
                  id="email"
                  type="email"
                  defaultValue={user?.email}
                />
              </div>
            </div>
          </CardContent>
          {/* <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter> */}
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Update your password here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Update Password</Button>
          </CardFooter>
        </Card>
        {/* </TabsContent>

          <TabsContent value="products" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Products</CardTitle>
                <CardDescription>
                  Manage the products you want to market.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Product Name Example</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          A revolutionary product that solves common problems.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 border-dashed flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground mb-4">
                      Add a new product to find marketing opportunities
                    </p>
                    <Button>Add New Product</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>
                  Manage your subscription and payment details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Monthly Plan</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          $12.00 billed monthly
                        </p>
                      </div>
                      <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        Active
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Payment Method</h3>
                    <div className="flex items-center gap-3">
                      <div className="bg-muted p-2 rounded">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">
                          Expires •••• •••• 4242
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expires 12/25
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <Button variant="outline">Update Payment Method</Button>
                <Button variant="destructive">Cancel Subscription</Button>
              </CardFooter>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>
                  View your past invoices and payment history.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Invoice #1234</p>
                        <p className="text-sm text-muted-foreground">
                          March 1, 2023
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">$12.00</p>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Invoice #1233</p>
                        <p className="text-sm text-muted-foreground">
                          February 1, 2023
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">$12.00</p>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Invoice #1232</p>
                        <p className="text-sm text-muted-foreground">
                          January 1, 2023
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">$12.00</p>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs> */}
      </div>
    </>
  )
}
