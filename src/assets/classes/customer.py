import sys


output_file = "output.txt"

class Customer(object):
    def __init__(self, id, first_name, last_name, email, street, city, state, zip, email_sent):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.street = street
        self.city = city
        self.state =state
        self.zip = zip
        self.email_sent = email_sent

    def print_Info(self, with_sent):
        #prints and formats infromation for a customer
        print("Customer #" + str(self.id))
        print(self.first_name)
        print(self.last_name)
        print(self.email)
        print(self.street)
        print(self.city + ',', self.state, self.zip)
        if(with_sent and self.email_sent != None):
            print("TIME STAMP")
            print(self.email_sent, "\n")
        else:
            print()
        

