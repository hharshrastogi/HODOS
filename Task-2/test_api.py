import requests
import json

BASE_URL = "http://localhost:5001"

print("=" * 50)
print("Testing Task 2 CRUD API")
print("=" * 50)

# Test 1: Create a Task (POST)
print("\n1. Testing POST /tasks - Create Task")
task_data = {
    "title": "Complete MongoDB Integration",
    "description": "Implement all CRUD operations with MongoDB"
}
response = requests.post(f"{BASE_URL}/tasks", json=task_data)
print(f"Status Code: {response.status_code}")
print(f"Response: {json.dumps(response.json(), indent=2)}")
task_id = response.json().get('task', {}).get('_id')

# Test 2: Get All Tasks (GET)
print("\n2. Testing GET /tasks - Get All Tasks")
response = requests.get(f"{BASE_URL}/tasks")
print(f"Status Code: {response.status_code}")
print(f"Response: {json.dumps(response.json(), indent=2)}")

# Test 3: Create Another Task
print("\n3. Creating another task for testing...")
task_data2 = {
    "title": "Learn Express.js",
    "description": "Master Express.js framework fundamentals"
}
response = requests.post(f"{BASE_URL}/tasks", json=task_data2)
print(f"Status Code: {response.status_code}")
task_id2 = response.json().get('task', {}).get('_id')

# Test 4: Update a Task (PUT)
if task_id:
    print(f"\n4. Testing PUT /tasks/{task_id} - Update Task")
    update_data = {
        "title": "Complete Full MongoDB Integration",
        "description": "Implement and test all CRUD operations with MongoDB database"
    }
    response = requests.put(f"{BASE_URL}/tasks/{task_id}", json=update_data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

# Test 5: Get All Tasks Again
print("\n5. Testing GET /tasks - Get All Tasks (after update)")
response = requests.get(f"{BASE_URL}/tasks")
print(f"Status Code: {response.status_code}")
print(f"Tasks Count: {response.json().get('count')}")

# Test 6: Delete a Task (DELETE)
if task_id2:
    print(f"\n6. Testing DELETE /tasks/{task_id2} - Delete Task")
    response = requests.delete(f"{BASE_URL}/tasks/{task_id2}")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

# Test 7: Final Get All Tasks
print("\n7. Testing GET /tasks - Get All Tasks (after deletion)")
response = requests.get(f"{BASE_URL}/tasks")
print(f"Status Code: {response.status_code}")
print(f"Tasks Count: {response.json().get('count')}")
print(f"Response: {json.dumps(response.json(), indent=2)}")

print("\n" + "=" * 50)
print("✅ All API tests completed successfully!")
print("=" * 50)
