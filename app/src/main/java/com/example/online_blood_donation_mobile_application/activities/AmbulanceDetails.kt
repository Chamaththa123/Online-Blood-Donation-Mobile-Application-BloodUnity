package com.example.online_blood_donation_mobile_application.activities

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import com.example.online_blood_donation_mobile_application.R
import com.example.online_blood_donation_mobile_application.models.AmbulanceModel
import com.google.firebase.database.FirebaseDatabase

class AmbulanceDetails : AppCompatActivity() {

    private lateinit var tvName: TextView
    private lateinit var tvLocation: TextView
    private lateinit var tvNumber: TextView
    private lateinit var updateambulance : Button
    private lateinit var deleteambulance : Button


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_ambulance_details)

        initView()
        setValuesToViews()

        updateambulance.setOnClickListener {
            openUpdateDialog(
                intent.getStringExtra("ambulanceId").toString(),
                intent.getStringExtra("name").toString()
            )
        }

        deleteambulance.setOnClickListener {
            deleteRecord(
                intent.getStringExtra("ambulanceId").toString()
            )
        }
    }

    private fun initView() {
        tvName = findViewById(R.id.etAName)
        tvLocation = findViewById(R.id.etALocation)
        tvNumber = findViewById(R.id.etANumber)
    }

    private fun setValuesToViews() {

        tvName.text = intent.getStringExtra("name")
        tvLocation.text = intent.getStringExtra("location")
        tvNumber.text = intent.getStringExtra("number")
        updateambulance = findViewById(R.id.updateambulance)
        deleteambulance = findViewById(R.id.deleteambulance)
    }

    private fun deleteRecord(
        id: String
    ){
        val dbRef = FirebaseDatabase.getInstance().getReference("Ambulance").child(id)
        val mTask = dbRef.removeValue()

        mTask.addOnSuccessListener {
            Toast.makeText(this, "Ambulance data deleted", Toast.LENGTH_LONG).show()

            val intent = Intent(this, AmbulanceDash::class.java)
            finish()
            startActivity(intent)
        }.addOnFailureListener{ error ->
            Toast.makeText(this, "Deleting Err ${error.message}", Toast.LENGTH_LONG).show()
        }
    }

    @SuppressLint("MissingInflatedId")
    private fun  openUpdateDialog(
        ambulanceId: String,
        name: String
    ){
        val mDialog = AlertDialog.Builder(this)
        val inflater = layoutInflater
        val mDialogView = inflater.inflate(R.layout.update_ambulance, null)

        mDialog.setView(mDialogView)

        val etAName = mDialogView.findViewById<EditText>(R.id.etAName)
        val etALocation = mDialogView.findViewById<EditText>(R.id.etALocation)
        val etANumber = mDialogView.findViewById<EditText>(R.id.etANumber)
        val btnUpdate = mDialogView.findViewById<Button>(R.id.btnUpdate)
        val deleteambulance = mDialogView.findViewById<Button>(R.id.deleteambulance)

        etAName.setText(intent.getStringExtra("name").toString())
        etALocation.setText(intent.getStringExtra("location").toString())
        etANumber.setText(intent.getStringExtra("number").toString())
        mDialog.setTitle("Update Ambulance Details")

        val alertDialog = mDialog.create()
        alertDialog.show()

        btnUpdate.setOnClickListener {
            updateAmbulanceStatus(
                ambulanceId,
                etAName.text.toString(),
                etALocation.text.toString(),
                etANumber.text.toString(),
                )
            Toast.makeText(applicationContext, "Ambulance Data Updated", Toast.LENGTH_LONG).show()

            //we are setting updated data to our textview
            tvName.text = etAName.text.toString()
            tvLocation.text = etALocation.text.toString()
            tvNumber.text = etANumber.text.toString()

            alertDialog.dismiss()
        }


    }

    private fun updateAmbulanceStatus(
        id: String,
        name: String,
        location: String,
        number: String
    ) {
        val dbRef = FirebaseDatabase.getInstance().getReference("Ambulance").child(id)
        val empInfo = AmbulanceModel(id,name,location,number)
        dbRef.setValue(empInfo)
    }
}