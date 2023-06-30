package com.example.online_blood_donation_mobile_application

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase


class Donate : AppCompatActivity() {

    private lateinit var dname:EditText
    private lateinit var dgroup:EditText
    private lateinit var daddress:EditText
    private lateinit var dnumber:EditText
    private lateinit var dsave:Button

    private lateinit var dbRef: DatabaseReference

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_donate)

        dname = findViewById(R.id.dname)
        dgroup = findViewById(R.id.dgroup)
        daddress = findViewById(R.id.daddress)
        dnumber = findViewById(R.id.dnumber)
        dsave = findViewById(R.id.rsave)

        dbRef = FirebaseDatabase.getInstance().getReference("Donator")

        dsave.setOnClickListener {
            saveDonatorData()
        }
    }

    private fun saveDonatorData(){
        val name = dname.text.toString()
        val group = dgroup.text.toString()
        val address = daddress.text.toString()
        val number = dnumber.text.toString()
        
        if(name.isEmpty()){
            dname.error ="Please Enter Your Name"
        }
        if(group.isEmpty()){
            dgroup.error ="Please Enter Your Blood Group"
        }
        if(address.isEmpty()){
            daddress.error ="Please Enter Your Address"
        }
        if(number.isEmpty()){
            dnumber.error ="Please Enter Your Contact Number"
        }

        if(name.isNotEmpty() && group.isNotEmpty() && address.isNotEmpty() && number.isNotEmpty()){
            val donatorId = dbRef.push().key!!
            val donator = DonatorModel(donatorId, name, group, address, number)

            dbRef.child(donatorId).setValue(donator).addOnCompleteListener {
                Toast.makeText(this,"Registered As Blood Donator !!! ",Toast.LENGTH_LONG).show()

                dname.text.clear()
                dgroup.text.clear()
                daddress.text.clear()
                dnumber.text.clear()
            }.addOnFailureListener {err ->
                Toast.makeText(this,"Error ${err.message}",Toast.LENGTH_LONG).show()
            }
        }else{
            Toast.makeText(this,"Please Enter All Required Field !!",Toast.LENGTH_LONG).show()
        }


    }

}