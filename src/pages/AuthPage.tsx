import React, { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const AuthPage = () => {
  const { signIn, signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orgName, setOrgName] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [orgDescription, setOrgDescription] = useState('');
  const [role, setRole] = useState<'volunteer' | 'nonprofit'>('volunteer');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const signinTabRef = useRef<HTMLButtonElement>(null);
  const signupTabRef = useRef<HTMLButtonElement>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const fullName = `${firstName} ${lastName}`;
    
    const additionalData: Record<string, any> = {
      phone: phoneNumber,
    };

    if (role === 'nonprofit') {
      additionalData.organization_name = orgName;
      additionalData.website = website;
      additionalData.address = address;
      additionalData.organization_description = orgDescription;
    }
    
    await signUp(email, password, fullName, role, additionalData);
  };

  const switchToSignUp = () => {
    if (signupTabRef.current) {
      signupTabRef.current.click();
    }
  };

  const switchToSignIn = () => {
    if (signinTabRef.current) {
      signinTabRef.current.click();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <img 
              src="/lovable-uploads/4a66e6a5-f8c3-4e73-abe5-bf4442b290e9.png"
              alt="Altruence Logo"
              className="h-16 w-16 rounded-full"
            />
          </div>
          <CardTitle className="text-2xl font-bold">Altruence</CardTitle>
          <CardDescription>Sign in to your account or create a new one</CardDescription>
        </CardHeader>
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin" ref={signinTabRef}>Sign In</TabsTrigger>
            <TabsTrigger value="signup" ref={signupTabRef}>Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <form onSubmit={handleSignIn}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="absolute right-3 top-2.5"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Don't have an account? <Link to="#" className="text-primary underline" onClick={switchToSignUp}>Sign up</Link>
                </p>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSignUp}>
              <CardContent className="space-y-4 pt-4">
                <div className="mb-4">
                  <RadioGroup 
                    defaultValue="volunteer" 
                    value={role} 
                    onValueChange={(value) => setRole(value as 'volunteer' | 'nonprofit')}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="volunteer" id="volunteer" />
                      <Label htmlFor="volunteer" className="text-md">Register as Volunteer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nonprofit" id="nonprofit" />
                      <Label htmlFor="nonprofit" className="text-md">Register as Non-Profit Organization</Label>
                    </div>
                  </RadioGroup>
                </div>

                {role === 'volunteer' ? (
                  <>
                    <h2 className="text-xl font-semibold">Create your Volunteer Account</h2>
                    <p className="text-muted-foreground text-sm">Let's get you set up to start volunteering</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold">Create your Non-Profit Account</h2>
                    <p className="text-muted-foreground text-sm">Let's get your organization set up to start managing events and volunteers</p>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                {role === 'nonprofit' && (
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input
                      id="orgName"
                      type="text"
                      placeholder="Organization Name"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      required
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email Address</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="absolute right-3 top-2.5"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                {role === 'nonprofit' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="Website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="orgDescription">Organization Description</Label>
                      <Textarea
                        id="orgDescription"
                        placeholder="Organization Description"
                        value={orgDescription}
                        onChange={(e) => setOrgDescription(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={agreeToTerms}
                        onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                        required
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-muted-foreground"
                      >
                        I agree to all the <Link to="#" className="text-primary underline">Terms & Conditions</Link>
                      </label>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || (role === 'nonprofit' && !agreeToTerms)}
                >
                  {loading ? 'Signing up...' : role === 'volunteer' ? 'CREATE VOLUNTEER ACCOUNT' : 'CREATE NON-PROFIT ACCOUNT'}
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Already have an account? <Link to="#" className="text-primary underline" onClick={switchToSignIn}>Sign in</Link>
                </p>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthPage;
