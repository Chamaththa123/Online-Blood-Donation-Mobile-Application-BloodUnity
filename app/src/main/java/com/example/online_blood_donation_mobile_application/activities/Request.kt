package com.example.online_blood_donation_mobile_application.activities

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import com.example.online_blood_donation_mobile_application.R
import com.example.online_blood_donation_mobile_application.models.RequestorModel
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase

class Request : AppCompatActivity() {

    private lateinit var rname: EditText
    private lateinit var rgroup: EditText
    private lateinit var rnic: EditText
    private lateinit var rphone: EditText
    private lateinit var rdate: EditText
    private lateinit var rsave: Button

    private lateinit var dbRef: DatabaseReference

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_request)

        rname = findViewById(R.id.rname)
        rgroup = findViewById(R.id.rgroup)
        rnic = findViewById(R.id.rnic)
        rphone = findViewById(R.id.rphone)
        rdate = findViewById(R.id.rdate)
        rsave = findViewById(R.id.rsave)

        val back2 = findViewById<ImageView>(R.id.back2)

        back2.setOnClickListener {
            val intent = Intent(this, Home::class.java)
            startActivity(intent)
        }

        dbRef = FirebaseDatabase.getInstance().getReference("Requestor")

        rsave.setOnClickListener {
            saveDonatorData()
        }
    }
    private fun saveDonatorData(){
        val name = rname.text.toString()
        val group = rgroup.text.toString()
        val nic = rnic.text.toString()
        val phone = rphone.text.toString()
        val date = rdate.text.toString()

        if(name.isEmpty()){
            rname.error ="Please Enter Patient Name"
        }
        if(group.isEmpty()){
            rgroup.error ="Please Enter Patient Blood Group"
        }
        if(nic.isEmpty()){
            rnic.error ="Please Enter Patient NIC"
        }
        if(phone.isEmpty()){
            rphone.error ="Please Enter Your Contact Person Phone"
        }
        if(date.isEmpty()){
            rdate.error ="Please Enter Required Date"
        }

        if(name.isNotEmpty() && group.isNotEmpty() && nic.isNotEmpty() && phone.isNotEmpty() && date.isNotEmpty()){
            val requestorId = dbRef.push().key!!
            val requestor = RequestorModel(requestorId,name,group,nic,phone,date)

            dbRef.child(requestorId).setValue(requestor).addOnCompleteListener {
                Toast.makeText(this,"Registered As Blood Requestor !!! ", Toast.LENGTH_LONG).show()

                rname.text.clear()
                rgroup.text.clear()
                rnic.text.clear()
                rphone.text.clear()
                rdate.text.clear()

            }.addOnFailureListener {err ->
                Toast.makeText(this,"Error ${err.message}", Toast.LENGTH_LONG).show()
            }
        }else{
            Toast.makeText(this,"Please Enter All Required Field !!", Toast.LENGTH_LONG).show()
        }
}}