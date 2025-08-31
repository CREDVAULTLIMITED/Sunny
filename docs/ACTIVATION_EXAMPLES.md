# Python Example
```python
from sunny_payments import Sunny
from sunny_payments.activation import setup_wizard

def activate_sunny():
    """Interactive setup wizard for Sunny Payments"""
    print("Welcome to Sunny Payments Setup!")
    
    # Account type selection
    account_type = input("""
Choose your account type:
1. Individual Developer
2. Business
Enter (1/2): """).strip()
    
    account_type = "individual" if account_type == "1" else "business"
    
    # Environment selection
    env = input("""
Choose environment:
1. Sandbox (Testing)
2. Production
Enter (1/2): """).strip()
    
    environment = "sandbox" if env == "1" else "production"
    
    # API key input
    api_key = input("\nEnter your API key: ").strip()
    
    # Initialize Sunny
    sunny = setup_wizard(
        account_type=account_type,
        api_key=api_key,
        environment=environment
    )
    
    print("\n✅ Sunny Payments activated successfully!")
    return sunny

# Usage Example
```python
from sunny_payments import Sunny

# Quick setup
sunny = Sunny.setup(api_key="your_api_key", account_type="individual")

# Or use interactive wizard
sunny = activate_sunny()

# Get help
help_text = sunny.get_help("quickstart")
print(help_text)

# Make a payment
payment = sunny.payments.create({
    "amount": 1000,
    "currency": "USD",
    "description": "Test payment"
})
```

# Node.js Example
```javascript
const { Sunny, setupWizard } = require('@sunny/payments');

async function activateSunny() {
    console.log("Welcome to Sunny Payments Setup!");
    
    const inquirer = require('inquirer');
    
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'accountType',
            message: 'Choose your account type:',
            choices: [
                { name: 'Individual Developer', value: 'individual' },
                { name: 'Business', value: 'business' }
            ]
        },
        {
            type: 'list',
            name: 'environment',
            message: 'Choose environment:',
            choices: [
                { name: 'Sandbox (Testing)', value: 'sandbox' },
                { name: 'Production', value: 'production' }
            ]
        },
        {
            type: 'input',
            name: 'apiKey',
            message: 'Enter your API key:',
            validate: input => input.length > 0
        }
    ]);
    
    const sunny = await setupWizard(answers);
    console.log("\n✅ Sunny Payments activated successfully!");
    return sunny;
}

// Usage Example
const { Sunny } = require('@sunny/payments');

// Quick setup
const sunny = await Sunny.setup({
    apiKey: 'your_api_key',
    accountType: 'individual'
});

// Or use interactive wizard
const sunny = await activateSunny();

// Get help
const helpText = await sunny.getHelp('quickstart');
console.log(helpText);

// Make a payment
const payment = await sunny.payments.create({
    amount: 1000,
    currency: 'USD',
    description: 'Test payment'
});

# PHP Example
```php
<?php

use Sunny\Payments\Sunny;
use Sunny\Payments\SetupWizard;

function activateSunny() {
    echo "Welcome to Sunny Payments Setup!\n\n";
    
    echo "Choose your account type:\n";
    echo "1. Individual Developer\n";
    echo "2. Business\n";
    $accountType = readline("Enter (1/2): ");
    $accountType = $accountType === "1" ? "individual" : "business";
    
    echo "\nChoose environment:\n";
    echo "1. Sandbox (Testing)\n";
    echo "2. Production\n";
    $env = readline("Enter (1/2): ");
    $environment = $env === "1" ? "sandbox" : "production";
    
    $apiKey = readline("\nEnter your API key: ");
    
    $sunny = SetupWizard::create([
        'accountType' => $accountType,
        'apiKey' => $apiKey,
        'environment' => $environment
    ]);
    
    echo "\n✅ Sunny Payments activated successfully!\n";
    return $sunny;
}

// Usage Example
use Sunny\Payments\Sunny;

// Quick setup
$sunny = Sunny::setup([
    'apiKey' => 'your_api_key',
    'accountType' => 'individual'
]);

// Or use interactive wizard
$sunny = activateSunny();

// Get help
$helpText = $sunny->getHelp('quickstart');
echo $helpText;

// Make a payment
$payment = $sunny->payments->create([
    'amount' => 1000,
    'currency' => 'USD',
    'description' => 'Test payment'
]);

# Ruby Example
```ruby
require 'sunny-payments'

def activate_sunny
  puts "Welcome to Sunny Payments Setup!"
  
  print """
Choose your account type:
1. Individual Developer
2. Business
Enter (1/2): """
  
  account_type = gets.chomp
  account_type = account_type == "1" ? "individual" : "business"
  
  print """
Choose environment:
1. Sandbox (Testing)
2. Production
Enter (1/2): """
  
  env = gets.chomp
  environment = env == "1" ? "sandbox" : "production"
  
  print "\nEnter your API key: "
  api_key = gets.chomp
  
  sunny = Sunny::SetupWizard.create(
    account_type: account_type,
    api_key: api_key,
    environment: environment
  )
  
  puts "\n✅ Sunny Payments activated successfully!"
  sunny
end

# Usage Example
require 'sunny-payments'

# Quick setup
sunny = Sunny.setup(
  api_key: 'your_api_key',
  account_type: 'individual'
)

# Or use interactive wizard
sunny = activate_sunny

# Get help
help_text = sunny.get_help('quickstart')
puts help_text

# Make a payment
payment = sunny.payments.create(
  amount: 1000,
  currency: 'USD',
  description: 'Test payment'
)

# Java Example
```java
import com.sunny.payments.Sunny;
import com.sunny.payments.SetupWizard;
import java.util.Scanner;

public class SunnyActivation {
    public static Sunny activateSunny() {
        System.out.println("Welcome to Sunny Payments Setup!");
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("\nChoose your account type:");
        System.out.println("1. Individual Developer");
        System.out.println("2. Business");
        System.out.print("Enter (1/2): ");
        String accountType = scanner.nextLine().trim();
        accountType = accountType.equals("1") ? "individual" : "business";
        
        System.out.println("\nChoose environment:");
        System.out.println("1. Sandbox (Testing)");
        System.out.println("2. Production");
        System.out.print("Enter (1/2): ");
        String env = scanner.nextLine().trim();
        String environment = env.equals("1") ? "sandbox" : "production";
        
        System.out.print("\nEnter your API key: ");
        String apiKey = scanner.nextLine().trim();
        
        Sunny sunny = SetupWizard.create()
            .withAccountType(accountType)
            .withApiKey(apiKey)
            .withEnvironment(environment)
            .initialize();
        
        System.out.println("\n✅ Sunny Payments activated successfully!");
        return sunny;
    }
}

// Usage Example
import com.sunny.payments.Sunny;

// Quick setup
Sunny sunny = Sunny.setup()
    .withApiKey("your_api_key")
    .withAccountType("individual")
    .initialize();

// Or use interactive wizard
Sunny sunny = SunnyActivation.activateSunny();

// Get help
String helpText = sunny.getHelp("quickstart");
System.out.println(helpText);

// Make a payment
Payment payment = sunny.payments().create(new PaymentRequest()
    .setAmount(1000L)
    .setCurrency("USD")
    .setDescription("Test payment")
);

# Go Example
```go
package main

import (
    "bufio"
    "fmt"
    "os"
    "strings"
    
    "github.com/sunny-payments/sunny-go"
)

func activateSunny() (*sunny.Client, error) {
    fmt.Println("Welcome to Sunny Payments Setup!")
    reader := bufio.NewReader(os.Stdin)
    
    fmt.Println("\nChoose your account type:")
    fmt.Println("1. Individual Developer")
    fmt.Println("2. Business")
    fmt.Print("Enter (1/2): ")
    accountType, _ := reader.ReadString('\n')
    accountType = strings.TrimSpace(accountType)
    if accountType == "1" {
        accountType = "individual"
    } else {
        accountType = "business"
    }
    
    fmt.Println("\nChoose environment:")
    fmt.Println("1. Sandbox (Testing)")
    fmt.Println("2. Production")
    fmt.Print("Enter (1/2): ")
    env, _ := reader.ReadString('\n')
    env = strings.TrimSpace(env)
    environment := "sandbox"
    if env != "1" {
        environment = "production"
    }
    
    fmt.Print("\nEnter your API key: ")
    apiKey, _ := reader.ReadString('\n')
    apiKey = strings.TrimSpace(apiKey)
    
    client, err := sunny.Setup(&sunny.SetupConfig{
        AccountType: accountType,
        ApiKey:      apiKey,
        Environment: environment,
    })
    
    if err != nil {
        return nil, err
    }
    
    fmt.Println("\n✅ Sunny Payments activated successfully!")
    return client, nil
}

// Usage Example
package main

import "github.com/sunny-payments/sunny-go"

func main() {
    // Quick setup
    client, err := sunny.Setup(&sunny.SetupConfig{
        ApiKey:      "your_api_key",
        AccountType: "individual",
    })
    if err != nil {
        panic(err)
    }
    
    // Or use interactive wizard
    client, err := activateSunny()
    if err != nil {
        panic(err)
    }
    
    // Get help
    helpText, err := client.GetHelp("quickstart")
    if err != nil {
        panic(err)
    }
    fmt.Println(helpText)
    
    // Make a payment
    payment, err := client.Payments.Create(&sunny.PaymentRequest{
        Amount:      1000,
        Currency:    "USD",
        Description: "Test payment",
    })
    if err != nil {
        panic(err)
    }
}

# .NET Example
```csharp
using Sunny.Payments;
using System;

public class SunnyActivation
{
    public static async Task<SunnyClient> ActivateSunny()
    {
        Console.WriteLine("Welcome to Sunny Payments Setup!");
        
        Console.WriteLine("\nChoose your account type:");
        Console.WriteLine("1. Individual Developer");
        Console.WriteLine("2. Business");
        Console.Write("Enter (1/2): ");
        var accountType = Console.ReadLine()?.Trim() == "1" ? "individual" : "business";
        
        Console.WriteLine("\nChoose environment:");
        Console.WriteLine("1. Sandbox (Testing)");
        Console.WriteLine("2. Production");
        Console.Write("Enter (1/2): ");
        var environment = Console.ReadLine()?.Trim() == "1" ? "sandbox" : "production";
        
        Console.Write("\nEnter your API key: ");
        var apiKey = Console.ReadLine()?.Trim();
        
        var sunny = await SetupWizard.Create(new SetupConfig
        {
            AccountType = accountType,
            ApiKey = apiKey,
            Environment = environment
        });
        
        Console.WriteLine("\n✅ Sunny Payments activated successfully!");
        return sunny;
    }
}

// Usage Example
using Sunny.Payments;

// Quick setup
var sunny = await SunnyClient.Setup(new SetupConfig
{
    ApiKey = "your_api_key",
    AccountType = "individual"
});

// Or use interactive wizard
var sunny = await SunnyActivation.ActivateSunny();

// Get help
var helpText = await sunny.GetHelp("quickstart");
Console.WriteLine(helpText);

// Make a payment
var payment = await sunny.Payments.Create(new PaymentRequest
{
    Amount = 1000,
    Currency = "USD",
    Description = "Test payment"
});
```
