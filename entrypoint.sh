#!/bin/sh

# Flag to track missing variables
missing_vars=false

# Function to check if an environment variable is set
check_var() {
	var_name=$1
	var_value=$(eval echo "\$$var_name")
	if [ -z "$var_value" ]; then
		echo "Warning: Environment variable $var_name is required."
		missing_vars=true
	fi
}

# Check required environment variables
check_var "DATABASE_URL"
check_var "SMTP_HOST"
check_var "SMTP_PORT"
check_var "SMTP_USER"
check_var "SMTP_PASSWORD"
check_var "EMAIL_TO"

# If any required environment variables are missing, exit with an error
if [ "$missing_vars" = true ]; then
	echo "Error: One or more required environment variables are missing."
	exit 1
fi

# Execute the command passed to the script
exec "$@"
